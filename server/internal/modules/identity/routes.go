package identity

import (
	"net/http"

	adminauthv1connect "github.com/ankushx05/authentication/gen/proto/admin/auth/v1/authv1connect"
	"github.com/ankushx05/authentication/gen/proto/app/auth/v1/authv1connect"
	"github.com/ankushx05/authentication/gen/proto/app/profile/v1/profilev1connect"
	"github.com/ankushx05/authentication/internal/platform/transport/interceptors"
)

func (m *Module) RegisterRoutes(mux *http.ServeMux) {
	// Public routes (no auth interceptor)
	authPath, authHandler := authv1connect.NewAuthServiceHandler(
		m.authHandler,
		interceptors.GlobalInterceptors(),
	)
	mux.Handle(authPath, authHandler)

	adminAuthPath, adminAuthHandler := adminauthv1connect.NewAuthServiceHandler(
		m.adminAuthHandler,
		interceptors.GlobalInterceptors(),
	)
	mux.Handle(adminAuthPath, adminAuthHandler)

	// Protected routes (with auth interceptor)
	profilePath, profileHandler := profilev1connect.NewProfileServiceHandler(
		m.profileHandler,
		interceptors.UserInterceptors(m.tokenService),
	)
	mux.Handle(profilePath, profileHandler)
}
