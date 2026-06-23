package settings

import (
	"net/http"

	settingsv1connect "github.com/ankushx05/authentication/gen/proto/admin/settings/v1/settingsv1connect"
	"github.com/ankushx05/authentication/internal/platform/transport/interceptors"
)

func (m *Module) RegisterRoutes(mux *http.ServeMux) {
	settingsPath, settingsHandler := settingsv1connect.NewSettingsServiceHandler(
		m.settingsHandler,
		interceptors.AdminInterceptors(m.tokenService),
	)
	mux.Handle(settingsPath, settingsHandler)
}
