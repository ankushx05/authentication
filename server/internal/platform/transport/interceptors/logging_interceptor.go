package interceptors

import (
	"context"
	"errors"
	"fmt"
	"time"

	"connectrpc.com/connect"
	"github.com/ankushx05/authentication/internal/platform/logger"
)

func NewLoggingInterceptor() connect.UnaryInterceptorFunc {
	log := logger.New()

	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			procedure := req.Spec().Procedure
			peer := req.Peer().Addr
			start := time.Now()

			log.Info("➡️  request",
				"procedure", procedure,
				"peer", peer,
			)

			res, err := next(ctx, req)
			duration := time.Since(start)

			if err != nil {
				code := connect.CodeInternal
				var connectErr *connect.Error
				if errors.As(err, &connectErr) {
					code = connectErr.Code()
				}

				log.Error("⬅️  failed",
					"procedure", procedure,
					"code", code.String(),
					"error", err.Error(),
					"duration", formatDuration(duration),
				)
			} else {
				log.Info("⬅️  success",
					"procedure", procedure,
					"duration", formatDuration(duration),
				)
			}

			return res, err
		}
	}
}

func formatDuration(d time.Duration) string {
	switch {
	case d < time.Millisecond:
		return fmt.Sprintf("%dµs", d.Microseconds())
	case d < time.Second:
		return fmt.Sprintf("%dms", d.Milliseconds())
	default:
		return fmt.Sprintf("%.2fs", d.Seconds())
	}
}
