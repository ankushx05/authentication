package settings

import (
	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	settingsgrpc "github.com/ankushx05/authentication/internal/modules/settings/adapters/grpc"
	"github.com/ankushx05/authentication/internal/modules/settings/adapters/repository"
	"github.com/ankushx05/authentication/internal/modules/settings/usecase"
	"github.com/ankushx05/authentication/internal/platform/deps"
	"github.com/ankushx05/authentication/internal/platform/jwt"
)

type Module struct {
	settingsHandler *settingsgrpc.SettingsHandler
	tokenService    *jwt.TokenService[domain.TokenPayload]
}

func NewModule(d *deps.Deps) *Module {
	repo := repository.NewEntSettingsRepository(d.DB)
	service := usecase.NewSettingsService(repo)

	settingsHandler := settingsgrpc.NewSettingsHandler(service)
	tokenService := jwt.NewTokenService[domain.TokenPayload](d.Config.JwtSecret, "auth-service", d.Config.JwtExpiration)

	return &Module{
		settingsHandler: settingsHandler,
		tokenService:    tokenService,
	}
}
