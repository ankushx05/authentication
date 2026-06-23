package ports

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/settings/domain"
)

type SettingsService interface {
	GetMailSettings(ctx context.Context) (*domain.MailSettings, error)
	UpdateMailSettings(ctx context.Context, mailSettings *domain.MailSettings) (*domain.MailSettings, error)
}
