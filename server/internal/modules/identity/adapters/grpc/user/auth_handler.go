package user

import (
	"context"

	"connectrpc.com/connect"
	authv1 "github.com/ankushx05/authentication/gen/proto/app/auth/v1"
	"github.com/ankushx05/authentication/gen/proto/app/auth/v1/authv1connect"
)

var _ authv1connect.AuthServiceHandler = (*AuthHandler)(nil)

type AuthHandler struct{}

func NewAuthHandler() *AuthHandler {
	return &AuthHandler{}
}

func (h *AuthHandler) Register(ctx context.Context, req *connect.Request[authv1.RegisterRequest]) (*connect.Response[authv1.RegisterResponse], error) {
	// curl \
	//     --header "Content-Type: application/json" \
	//     --data '{"fullname": "Ankush Kumar"}' \
	//     http://localhost:8888/app.auth.v1.AuthService/Register

	return connect.NewResponse(&authv1.RegisterResponse{
		Message: "Register Success",
	}), nil
}
