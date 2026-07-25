package mail

import (
	"net/http"

	"github.com/ankushx05/authentication/gen/proto/admin/mail_template/v1/mail_templatev1connect"
	"github.com/ankushx05/authentication/internal/platform/transport/interceptors"
)

func (m *Module) RegisterRoutes(mux *http.ServeMux) {
	mailTemplatePath, mailTemplateHandler := mail_templatev1connect.NewMailTemplateServiceHandler(
		m.mailTemplateHandler,
		interceptors.AdminInterceptors(m.tokenService),
	)
	mux.Handle(mailTemplatePath, mailTemplateHandler)
}
