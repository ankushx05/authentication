package repository

import (
	"context"
	"time"

	"github.com/ankushx05/authentication/internal/modules/mail/domain"
	"github.com/ankushx05/authentication/internal/modules/mail/ports"
	"github.com/ankushx05/authentication/internal/platform/database/ent"
	"github.com/ankushx05/authentication/internal/platform/database/ent/mailtemplates"
	"github.com/google/uuid"
)

type entMailTemplateRepository struct {
	client *ent.Client
}

func NewEntMailTemplateRepository(client *ent.Client) ports.MailTemplateRepository {
	return &entMailTemplateRepository{client: client}
}

func (r *entMailTemplateRepository) Create(ctx context.Context, t *domain.MailTemplate) (*domain.MailTemplate, error) {
	res, err := r.client.MailTemplates.
		Create().
		SetName(t.Name).
		SetSubject(t.Subject).
		SetBody(t.Body).
		SetVariables(t.Variables).
		SetUniqueKey(t.UniqueKey).
		Save(ctx)

	if err != nil {
		return nil, err
	}

	return r.mapToDomain(res), nil
}

func (r *entMailTemplateRepository) Update(ctx context.Context, t *domain.MailTemplate) (*domain.MailTemplate, error) {
	res, err := r.client.MailTemplates.
		UpdateOneID(t.ID).
		SetName(t.Name).
		SetSubject(t.Subject).
		SetBody(t.Body).
		SetVariables(t.Variables).
		SetUniqueKey(t.UniqueKey).
		Save(ctx)

	if err != nil {
		return nil, err
	}

	return r.mapToDomain(res), nil
}

func (r *entMailTemplateRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.client.MailTemplates.
		UpdateOneID(id).
		SetDeletedAt(time.Now()).
		Save(ctx)
	return err
}

func (r *entMailTemplateRepository) GetByID(ctx context.Context, id uuid.UUID) (*domain.MailTemplate, error) {
	res, err := r.client.MailTemplates.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return r.mapToDomain(res), nil
}

func (r *entMailTemplateRepository) GetByUniqueKey(ctx context.Context, uniqueKey string) (*domain.MailTemplate, error) {
	res, err := r.client.MailTemplates.Query().
		Where(
			mailtemplates.UniqueKey(uniqueKey),
			mailtemplates.DeletedAtIsNil(),
		).
		Only(ctx)
	if err != nil {
		return nil, err
	}
	return r.mapToDomain(res), nil
}

func (r *entMailTemplateRepository) List(ctx context.Context) ([]*domain.MailTemplate, error) {
	results, err := r.client.MailTemplates.Query().
		Where(mailtemplates.DeletedAtIsNil()).
		Order(ent.Desc(mailtemplates.FieldCreatedAt)).
		All(ctx)
	if err != nil {
		return nil, err
	}

	templates := make([]*domain.MailTemplate, len(results))
	for i, res := range results {
		templates[i] = r.mapToDomain(res)
	}
	return templates, nil
}

func (r *entMailTemplateRepository) mapToDomain(e *ent.MailTemplates) *domain.MailTemplate {
	if e == nil {
		return nil
	}
	return &domain.MailTemplate{
		ID:        e.ID,
		Name:      e.Name,
		Subject:   e.Subject,
		Body:      e.Body,
		Variables: e.Variables,
		UniqueKey: e.UniqueKey,
		CreatedAt: e.CreatedAt,
		UpdatedAt: e.UpdatedAt,
		DeletedAt: e.DeletedAt,
	}
}
