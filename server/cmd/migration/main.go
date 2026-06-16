package main

import (
	"context"
	"fmt"

	"github.com/ankushx05/authentication/internal/platform/config"
	"github.com/ankushx05/authentication/internal/platform/database"
	"github.com/ankushx05/authentication/internal/platform/logger"
)

func main() {
	if err := run(); err != nil {
		log := logger.New()
		log.Fatal("Migration failed", "error", err)
	}
}

func run() error {
	log := logger.New()

	// Load Env
	env, err := config.Load(log)
	if err != nil {
		return err
	}

	// Connect to db
	client, err := database.NewPostgresClient(context.Background(), env.DatabaseURL, log)
	if err != nil {
		return err
	}
	defer client.Close()

	// migrate
	if err := client.Schema.Create(context.Background()); err != nil {
		return fmt.Errorf("failed creating schema resources: %w", err)
	}

	log.Info("Database migrated successfully")

	return nil
}
