package user

import (
	"context"

	"connectrpc.com/connect"
	authv1 "github.com/ankushx05/authentication/gen/proto/app/auth/v1"
	"github.com/ankushx05/authentication/gen/proto/app/auth/v1/authv1connect"
	"github.com/ankushx05/authentication/internal/modules/identity/ports"
)

var _ authv1connect.AuthServiceHandler = (*AuthHandler)(nil)

type AuthHandler struct {
	userService ports.UserService
}

func NewAuthHandler(userService ports.UserService) *AuthHandler {
	return &AuthHandler{userService: userService}
}

func (h *AuthHandler) Register(ctx context.Context, req *connect.Request[authv1.RegisterRequest]) (*connect.Response[authv1.RegisterResponse], error) {
	// curl \
	//     --header "Content-Type: application/json" \
	//     --data '{"fullname": "Ankush Kumar"}' \
	//     http://localhost:8888/app.auth.v1.AuthService/Register

	fullname := req.Msg.GetFullname()
	username := req.Msg.GetUsername()
	email := req.Msg.GetEmail()
	password := req.Msg.GetPassword()

	_, err := h.userService.CreateUser(ctx, fullname, email, username, password)

	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&authv1.RegisterResponse{
		Message: "Register Success",
	}), nil
}

func (h *AuthHandler) Login(ctx context.Context, req *connect.Request[authv1.LoginRequest]) (*connect.Response[authv1.LoginResponse], error) {
	email := req.Msg.GetEmail()
	password := req.Msg.GetPassword()

	_, err := h.userService.Login(ctx, email, password)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&authv1.LoginResponse{
		Message: "Login Success",
	}), nil
}
