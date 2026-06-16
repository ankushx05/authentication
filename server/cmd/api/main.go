package main

import (
	"context"
	"os/signal"
	"syscall"
	"time"

	"github.com/ankushx05/authentication/internal/bootstrap"
	"github.com/ankushx05/authentication/internal/platform/logger"
)

func main() {
	log := logger.New()

	app, err := bootstrap.NewApplication()
	if err != nil {
		log.Fatal("Failed to initialize application", "error", err)
	}

	ctx, stop := signal.NotifyContext(
		context.Background(),
		syscall.SIGINT,
		syscall.SIGTERM,
	)
	defer stop()

	if err := app.Start(ctx); err != nil {
		log.Fatal("Failed to start application", "error", err)
	}

	<-ctx.Done()
	app.Log.Warn("Shutting down server...")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := app.Shutdown(shutdownCtx); err != nil {
		log.Fatal("Failed to shutdown gracefully", "error", err)
	}

	app.Log.Info("Server exited gracefully")
}
