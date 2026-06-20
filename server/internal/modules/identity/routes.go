package identity

import (
	"net/http"

	"github.com/ankushx05/authentication/gen/proto/app/auth/v1/authv1connect"
	"github.com/ankushx05/authentication/internal/platform/transport/interceptors"
)

func (m *Module) RegisterRoutes(mux *http.ServeMux) {
	path, handler := authv1connect.NewAuthServiceHandler(
		m.authHandler,
		interceptors.GlobalInterceptors(),
	)
	mux.Handle(path, handler)
}
