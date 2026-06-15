package bootstrap

import (
	"context"
	"errors"
	"log"
	"net/http"

	"github.com/ankushx05/authentication/internal/platform/config"
)

type Application struct {
	Server *http.Server
	Config *config.Config
}

func NewApplication() (*Application, error) {
	cfg, err := config.Load()
	if err != nil {
		return nil, err
	}

	mux := NewRouter()

	s := NewHTTPServer(mux, cfg)

	return &Application{
		Server: s,
		Config: cfg,
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
	err := a.Server.Shutdown(ctx)
	if err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}
	return nil
}
