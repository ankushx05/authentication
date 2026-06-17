package identity

import (
	"net/http"

	"connectrpc.com/connect"
	"connectrpc.com/validate"
	"github.com/ankushx05/authentication/gen/proto/app/auth/v1/authv1connect"
)

func (m *Module) RegisterRoutes(mux *http.ServeMux) {
	path, handler := authv1connect.NewAuthServiceHandler(m.UserAuthHanlder, connect.WithInterceptors(validate.NewInterceptor()))
	mux.Handle(path, handler)
}
