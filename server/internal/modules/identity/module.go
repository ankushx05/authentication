package identity

import (
	usergrpc "github.com/ankushx05/authentication/internal/modules/identity/adapters/grpc/user"
	"github.com/ankushx05/authentication/internal/modules/identity/adapters/repository"
	"github.com/ankushx05/authentication/internal/modules/identity/usecase"
	"github.com/ankushx05/authentication/internal/platform/database/ent"
)

type Module struct {
	UserAuthHanlder *usergrpc.AuthHandler
}

func NewModule(dbClient *ent.Client) *Module {

	repo := repository.NewEntUserRepository(dbClient)

	service := usecase.NewUserService(repo)

	authHandler := usergrpc.NewAuthHandler(service)

	return &Module{
		UserAuthHanlder: authHandler,
	}
}
