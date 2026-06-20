package identity

import (
	usergrpc "github.com/ankushx05/authentication/internal/modules/identity/adapters/grpc/user"
	"github.com/ankushx05/authentication/internal/modules/identity/adapters/repository"
	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	"github.com/ankushx05/authentication/internal/modules/identity/usecase"
	"github.com/ankushx05/authentication/internal/platform/deps"
	"github.com/ankushx05/authentication/internal/platform/jwt"
)

type Module struct {
	authHandler *usergrpc.AuthHandler
}

func NewModule(d *deps.Deps) *Module {
	repo := repository.NewEntUserRepository(d.DB)
	service := usecase.NewUserService(repo)

	tokenService := jwt.NewTokenService[domain.TokenPayload](d.Config.JwtSecret, "auth-service", d.Config.JwtExpiration)
	authHandler := usergrpc.NewAuthHandler(service, tokenService, d.Cookie)

	return &Module{
		authHandler: authHandler,
	}
}
