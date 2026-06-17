package identity

import (
	usergrpc "github.com/ankushx05/authentication/internal/modules/identity/adapters/grpc/user"
)

type Module struct {
	UserAuthHanlder *usergrpc.AuthHandler
}

func NewModule() *Module {
	authHandler := usergrpc.NewAuthHandler()

	return &Module{
		UserAuthHanlder: authHandler,
	}
}
