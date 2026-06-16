package main

import (
	"context"
	"log"
	"os/signal"
	"syscall"
	"time"

	"github.com/ankushx05/authentication/internal/bootstrap"
)

func main() {
	app, err := bootstrap.NewApplication()
	if err != nil {
		log.Fatal(err)
	}

	ctx, stop := signal.NotifyContext(
		context.Background(),
		syscall.SIGINT,
		syscall.SIGTERM,
	)
	defer stop()

	if err := app.Start(ctx); err != nil {
		log.Fatal(err)
	}

	<-ctx.Done()
	log.Println("⏳ Shutting down server...")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := app.Shutdown(shutdownCtx); err != nil {
		log.Fatal(err)
	}

	log.Println("👋 Server exited gracefully")
}
