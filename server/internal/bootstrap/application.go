package bootstrap

import (
	"context"
	"errors"
	"net/http"

	"github.com/ankushx05/authentication/internal/modules/identity"
	"github.com/ankushx05/authentication/internal/platform/config"
	"github.com/ankushx05/authentication/internal/platform/database"
	"github.com/ankushx05/authentication/internal/platform/database/ent"
	"github.com/ankushx05/authentication/internal/platform/logger"
)

type Application struct {
	Server   *http.Server
	Config   *config.Config
	DBClient *ent.Client
	Log      *logger.Logger
}

func NewApplication() (*Application, error) {
	// 1. Initialize logger
	log := logger.New()

	// 2. Load configuration
	cfg, err := config.Load(log)
	if err != nil {
		return nil, err
	}

	// 3. Connect to database
	ctx := context.Background()
	dbClient, err := database.NewPostgresClient(ctx, cfg.DatabaseURL, log)
	if err != nil {
		return nil, err
	}

	// 4. Wire up modules
	identityModule := identity.NewModule()

	// 5. Initialize router and register routes
	mux := NewRouter()
	identityModule.RegisterRoutes(mux)

	// 6. Initialize HTTP server
	s := NewHTTPServer(mux, cfg)

	return &Application{
		Server:   s,
		Config:   cfg,
		DBClient: dbClient,
		Log:      log,
	}, nil
}

func (a *Application) Start(ctx context.Context) error {
	go func() {
		a.Log.Info("Server listening", "url", "http://localhost"+a.Server.Addr)
		if err := a.Server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			a.Log.Fatal("Failed to start server", "error", err)
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
			a.Log.Error("Failed to close database connection", "error", err)
		}
	}

	return nil
}
