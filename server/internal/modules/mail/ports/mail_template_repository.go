package ports

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/mail/domain"
	"github.com/google/uuid"
)

type MailTemplateRepository interface {
	Create(ctx context.Context, template *domain.MailTemplate) (*domain.MailTemplate, error)
	Update(ctx context.Context, template *domain.MailTemplate) (*domain.MailTemplate, error)
	Delete(ctx context.Context, id uuid.UUID) error
	GetByID(ctx context.Context, id uuid.UUID) (*domain.MailTemplate, error)
	GetByUniqueKey(ctx context.Context, uniqueKey string) (*domain.MailTemplate, error)
	List(ctx context.Context) ([]*domain.MailTemplate, error)
}
