package main

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect/sql/schema"
	"github.com/ankushx05/authentication/internal/platform/config"
	"github.com/ankushx05/authentication/internal/platform/database"
	entUser "github.com/ankushx05/authentication/internal/platform/database/ent/user"
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
	if err := client.Schema.Create(context.Background(), schema.WithDropColumn(true)); err != nil {
		return fmt.Errorf("failed creating schema resources: %w", err)
	}

	log.Info("Database migrated successfully")

	// Seed admin user if not exists
	ctx := context.Background()
	exists, err := client.User.Query().
		Where(entUser.Email("admin@gmail.com")).
		Exist(ctx)
	if err != nil {
		return fmt.Errorf("failed to query admin user: %w", err)
	}

	if !exists {
		_, err = client.User.Create().
			SetFullname("Admin User").
			SetEmail("admin@gmail.com").
			SetUsername("admin").
			SetPassword("11111111").
			SetIsAdmin(true).
			Save(ctx)
		if err != nil {
			return fmt.Errorf("failed to seed admin user: %w", err)
		}
		log.Info("Admin user seeded successfully")
	}

	return nil
}
