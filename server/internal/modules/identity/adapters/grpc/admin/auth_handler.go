package admin

import (
	"context"

	"connectrpc.com/connect"
	authv1 "github.com/ankushx05/authentication/gen/proto/admin/auth/v1"
	"github.com/ankushx05/authentication/gen/proto/admin/auth/v1/authv1connect"
	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	"github.com/ankushx05/authentication/internal/modules/identity/ports"
	"github.com/ankushx05/authentication/internal/platform/cookie"
	"github.com/ankushx05/authentication/internal/platform/jwt"
)

var _ authv1connect.AuthServiceHandler = (*AuthHandler)(nil)

type AuthHandler struct {
	userService   ports.UserService
	tokenService  *jwt.TokenService[domain.TokenPayload]
	cookieManager *cookie.CookieManager
}

func NewAdminAuthHandler(userService ports.UserService, tokenService *jwt.TokenService[domain.TokenPayload], cookieManager *cookie.CookieManager) *AuthHandler {
	return &AuthHandler{
		userService:   userService,
		tokenService:  tokenService,
		cookieManager: cookieManager,
	}
}

// ======================= ADMIN LOGIN =======================
func (h *AuthHandler) Login(ctx context.Context, req *connect.Request[authv1.LoginRequest]) (*connect.Response[authv1.LoginResponse], error) {
	email := req.Msg.GetEmail()
	password := req.Msg.GetPassword()

	user, err := h.userService.AdminLogin(ctx, email, password)
	if err != nil {
		return nil, err
	}

	// Generate token
	payload := domain.TokenPayload{
		ID:       user.ID.String(),
		Email:    user.Email,
		Username: user.Username,
	}

	token, err := h.tokenService.GenerateToken(payload)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	// Build response and set cookie
	res := connect.NewResponse(&authv1.LoginResponse{
		Message: "Login Success",
	})

	h.cookieManager.SetCookie(res, cookie.AdminAccessTokenCookie, token, h.tokenService.Expiry())

	return res, nil
}

// ======================= LOGOUT =======================
func (h *AuthHandler) Logout(ctx context.Context, req *connect.Request[authv1.LogoutRequest]) (*connect.Response[authv1.LogoutResponse], error) {
	// Build response and delete cookie
	res := connect.NewResponse(&authv1.LogoutResponse{
		Message: "Logout Success",
	})

	h.cookieManager.DeleteCookie(res, cookie.AdminAccessTokenCookie)

	return res, nil
}
