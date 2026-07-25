package mail

import (
	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	mailgrpc "github.com/ankushx05/authentication/internal/modules/mail/adapters/grpc"
	"github.com/ankushx05/authentication/internal/modules/mail/adapters/repository"
	"github.com/ankushx05/authentication/internal/modules/mail/usecase"
	settingsPorts "github.com/ankushx05/authentication/internal/modules/settings/ports"
	"github.com/ankushx05/authentication/internal/platform/deps"
	"github.com/ankushx05/authentication/internal/platform/jwt"
)

type Module struct {
	mailTemplateHandler *mailgrpc.MailTemplateHandler
	MailTemplateService *usecase.MailTemplateService
	tokenService        *jwt.TokenService[domain.TokenPayload]
}

func NewModule(d *deps.Deps, settingsService settingsPorts.SettingsService) *Module {
	repo := repository.NewEntMailTemplateRepository(d.DB)
	service := usecase.NewMailTemplateService(repo, settingsService)

	handler := mailgrpc.NewMailTemplateHandler(service)
	tokenService := jwt.NewTokenService[domain.TokenPayload](d.Config.JwtSecret, "auth-service", d.Config.JwtExpiration)

	return &Module{
		mailTemplateHandler: handler,
		MailTemplateService: service,
		tokenService:        tokenService,
	}
}
