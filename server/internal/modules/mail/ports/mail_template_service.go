package ports

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/mail/domain"
	"github.com/google/uuid"
)

type MailTemplateService interface {
	CreateMailTemplate(ctx context.Context, template *domain.MailTemplate) (*domain.MailTemplate, error)
	UpdateMailTemplate(ctx context.Context, template *domain.MailTemplate) (*domain.MailTemplate, error)
	DeleteMailTemplate(ctx context.Context, id uuid.UUID) error
	GetMailTemplate(ctx context.Context, id uuid.UUID) (*domain.MailTemplate, error)
	ListMailTemplates(ctx context.Context) ([]*domain.MailTemplate, error)
	SendMail(ctx context.Context, uniqueKey string, variables map[string]string, toEmail string) error
}
