package main

import (
	"context"
	"log"

	"github.com/ankushx05/authentication/internal/platform/config"
	"github.com/ankushx05/authentication/internal/platform/database"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	// Load Env
	env, err := config.Load()
	if err != nil {
		return err
	}

	// Connect to db
	client, err := database.NewPostgresClient(context.Background(), env.DatabaseURL)
	if err != nil {
		return err
	}
	defer client.Close()

	// migrate
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	log.Println("✅ Database migrated successfully")

	return nil
}
