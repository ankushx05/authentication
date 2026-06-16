package logger

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"os"
	"runtime"
	"strings"
	"sync"
	"time"
)

// ANSI color codes
const (
	reset      = "\033[0m"
	bold       = "\033[1m"
	dim        = "\033[2m"
	italic     = "\033[3m"
	underline  = "\033[4m"

	// Foreground colors
	black   = "\033[30m"
	red     = "\033[31m"
	green   = "\033[32m"
	yellow  = "\033[33m"
	blue    = "\033[34m"
	magenta = "\033[35m"
	cyan    = "\033[36m"
	white   = "\033[37m"

	// Bright foreground colors
	brightRed    = "\033[91m"
	brightGreen  = "\033[92m"
	brightYellow = "\033[93m"
	brightBlue   = "\033[94m"
	brightCyan   = "\033[96m"
	brightWhite  = "\033[97m"

	// Background colors for level badges
	bgRed    = "\033[41m"
	bgGreen  = "\033[42m"
	bgYellow = "\033[43m"
	bgBlue   = "\033[44m"
	bgCyan   = "\033[46m"
)

// Logger wraps slog.Logger with colorful output and a Fatal method.
type Logger struct {
	*slog.Logger
	handler *colorHandler
}

// colorHandler is a custom slog.Handler that outputs colorful logs.
type colorHandler struct {
	opts   slog.HandlerOptions
	mu     *sync.Mutex
	w      io.Writer
	attrs  []slog.Attr
	groups []string
}

// levelConfig maps log levels to their color scheme.
type levelConfig struct {
	badge string // colored level badge
	icon  string // emoji icon
	color string // color for the message text
}

func getLevelConfig(level slog.Level) levelConfig {
	switch {
	case level < slog.LevelInfo: // DEBUG
		return levelConfig{
			badge: fmt.Sprintf("%s%s%s DEBUG %s", bold, bgCyan, black, reset),
			icon:  "🔍",
			color: cyan,
		}
	case level < slog.LevelWarn: // INFO
		return levelConfig{
			badge: fmt.Sprintf("%s%s%s INFO  %s", bold, bgGreen, black, reset),
			icon:  "✅",
			color: green,
		}
	case level < slog.LevelError: // WARN
		return levelConfig{
			badge: fmt.Sprintf("%s%s%s WARN  %s", bold, bgYellow, black, reset),
			icon:  "⚠️",
			color: yellow,
		}
	default: // ERROR and above
		return levelConfig{
			badge: fmt.Sprintf("%s%s%s ERROR %s", bold, bgRed, brightWhite, reset),
			icon:  "❌",
			color: red,
		}
	}
}

func newColorHandler(w io.Writer, opts *slog.HandlerOptions) *colorHandler {
	if opts == nil {
		opts = &slog.HandlerOptions{}
	}
	return &colorHandler{
		opts: *opts,
		mu:   &sync.Mutex{},
		w:    w,
	}
}

func (h *colorHandler) Enabled(_ context.Context, level slog.Level) bool {
	minLevel := slog.LevelInfo
	if h.opts.Level != nil {
		minLevel = h.opts.Level.Level()
	}
	return level >= minLevel
}

func (h *colorHandler) Handle(_ context.Context, r slog.Record) error {
	cfg := getLevelConfig(r.Level)

	var b strings.Builder

	// Timestamp
	timestamp := r.Time.Format("15:04:05.000")
	fmt.Fprintf(&b, "%s%s%s ", dim, timestamp, reset)

	// Level badge
	fmt.Fprintf(&b, "%s ", cfg.badge)

	// Icon + Message
	fmt.Fprintf(&b, "%s %s%s%s%s", cfg.icon, bold, cfg.color, r.Message, reset)

	// Attributes (key=value pairs)
	allAttrs := make([]slog.Attr, 0, len(h.attrs))
	allAttrs = append(allAttrs, h.attrs...)
	r.Attrs(func(a slog.Attr) bool {
		allAttrs = append(allAttrs, a)
		return true
	})

	if len(allAttrs) > 0 {
		fmt.Fprintf(&b, " %s│%s ", dim, reset)
		for i, a := range allAttrs {
			if i > 0 {
				fmt.Fprintf(&b, " ")
			}
			key := a.Key
			// Add group prefix if any
			for _, g := range h.groups {
				key = g + "." + key
			}
			fmt.Fprintf(&b, "%s%s%s=%s%s%s",
				dim, key, reset,
				cfg.color, a.Value.String(), reset,
			)
		}
	}

	b.WriteString("\n")

	h.mu.Lock()
	defer h.mu.Unlock()
	_, err := h.w.Write([]byte(b.String()))
	return err
}

func (h *colorHandler) WithAttrs(attrs []slog.Attr) slog.Handler {
	newAttrs := make([]slog.Attr, len(h.attrs)+len(attrs))
	copy(newAttrs, h.attrs)
	copy(newAttrs[len(h.attrs):], attrs)
	return &colorHandler{
		opts:   h.opts,
		mu:     h.mu,
		w:      h.w,
		attrs:  newAttrs,
		groups: h.groups,
	}
}

func (h *colorHandler) WithGroup(name string) slog.Handler {
	newGroups := make([]string, len(h.groups)+1)
	copy(newGroups, h.groups)
	newGroups[len(h.groups)] = name
	return &colorHandler{
		opts:   h.opts,
		mu:     h.mu,
		w:      h.w,
		attrs:  h.attrs,
		groups: newGroups,
	}
}

// New creates a new colorful Logger instance.
func New() *Logger {
	handler := newColorHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	})

	l := slog.New(handler)
	slog.SetDefault(l)

	return &Logger{
		Logger:  l,
		handler: handler,
	}
}

// Fatal logs an error message and exits the program with status code 1.
func (l *Logger) Fatal(msg string, args ...any) {
	// Build the record manually so we can set the correct caller
	r := slog.NewRecord(time.Now(), slog.LevelError, msg, pcs(2))
	r.Add(args...)

	cfg := getLevelConfig(slog.LevelError)
	var b strings.Builder

	timestamp := r.Time.Format("15:04:05.000")
	fmt.Fprintf(&b, "%s%s%s ", dim, timestamp, reset)

	// FATAL badge (distinct from ERROR)
	fmt.Fprintf(&b, "%s%s%s FATAL %s ", bold, bgRed, brightWhite, reset)

	fmt.Fprintf(&b, "💀 %s%s%s%s", bold, cfg.color, r.Message, reset)

	// Attributes
	allAttrs := make([]slog.Attr, 0)
	r.Attrs(func(a slog.Attr) bool {
		allAttrs = append(allAttrs, a)
		return true
	})

	if len(allAttrs) > 0 {
		fmt.Fprintf(&b, " %s│%s ", dim, reset)
		for i, a := range allAttrs {
			if i > 0 {
				fmt.Fprintf(&b, " ")
			}
			fmt.Fprintf(&b, "%s%s%s=%s%s%s",
				dim, a.Key, reset,
				cfg.color, a.Value.String(), reset,
			)
		}
	}

	b.WriteString("\n")

	l.handler.mu.Lock()
	l.handler.w.Write([]byte(b.String()))
	l.handler.mu.Unlock()

	os.Exit(1)
}

// pcs returns a program counter for the caller at the given skip depth.
func pcs(skip int) uintptr {
	var pcs [1]uintptr
	runtime.Callers(skip+1, pcs[:])
	return pcs[0]
}
