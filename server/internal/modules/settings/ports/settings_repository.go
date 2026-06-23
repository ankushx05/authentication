package ports

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/settings/domain"
)

type SettingsRepository interface {
	GetByUniqueID(ctx context.Context, uniqueID string) (*domain.Setting, error)
	Save(ctx context.Context, setting *domain.Setting) (*domain.Setting, error)
}
