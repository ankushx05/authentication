package bootstrap

import (
	"context"
	"errors"
	"log"
	"net/http"

	"github.com/ankushx05/authentication/internal/platform/config"
	"github.com/ankushx05/authentication/internal/platform/database"
	"github.com/ankushx05/authentication/internal/platform/database/ent"
)

type Application struct {
	Server   *http.Server
	Config   *config.Config
	DBClient *ent.Client
}

func NewApplication() (*Application, error) {
	cfg, err := config.Load()
	if err != nil {
		return nil, err
	}

	// Connect to database
	ctx := context.Background()
	dbClient, err := database.NewPostgresClient(ctx, cfg.DatabaseURL)
	if err != nil {
		return nil, err
	}

	mux := NewRouter()

	s := NewHTTPServer(mux, cfg)

	return &Application{
		Server:   s,
		Config:   cfg,
		DBClient: dbClient,
	}, nil
}

func (a *Application) Start(ctx context.Context) error {
	go func() {
		log.Printf("✅ Server listening on http://localhost%s", a.Server.Addr)
		if err := a.Server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("❌ Failed to start server: %v", err)
		}
	}()
	return nil
}

func (a *Application) Shutdown(ctx context.Context) error {
	if err := a.Server.Shutdown(ctx); err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	if a.DBClient != nil {
		if err := a.DBClient.Close(); err != nil {
			log.Printf("failed to close database connection: %v", err)
		}
	}

	return nil
}
