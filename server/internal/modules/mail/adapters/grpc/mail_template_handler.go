package grpc

import (
	"context"

	"connectrpc.com/connect"
	mailtemplatev1 "github.com/ankushx05/authentication/gen/proto/admin/mail_template/v1"
	"github.com/ankushx05/authentication/gen/proto/admin/mail_template/v1/mail_templatev1connect"
	"github.com/ankushx05/authentication/internal/modules/mail/domain"
	"github.com/ankushx05/authentication/internal/modules/mail/ports"
	"github.com/google/uuid"
)

var _ mail_templatev1connect.MailTemplateServiceHandler = (*MailTemplateHandler)(nil)

type MailTemplateHandler struct {
	service ports.MailTemplateService
}

func NewMailTemplateHandler(service ports.MailTemplateService) *MailTemplateHandler {
	return &MailTemplateHandler{service: service}
}

// ======================= CREATE =======================
func (h *MailTemplateHandler) CreateMailTemplate(ctx context.Context, req *connect.Request[mailtemplatev1.CreateMailTemplateRequest]) (*connect.Response[mailtemplatev1.CreateMailTemplateResponse], error) {
	template := &domain.MailTemplate{
		Name:      req.Msg.GetName(),
		Subject:   req.Msg.GetSubject(),
		Body:      req.Msg.GetBody(),
		Variables: req.Msg.GetVariables(),
		UniqueKey: req.Msg.GetUniqueKey().String(),
	}

	created, err := h.service.CreateMailTemplate(ctx, template)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&mailtemplatev1.CreateMailTemplateResponse{
		Message:      "Mail template created successfully",
		MailTemplate: domainToProto(created),
	}), nil
}

// ======================= UPDATE =======================
func (h *MailTemplateHandler) UpdateMailTemplate(ctx context.Context, req *connect.Request[mailtemplatev1.UpdateMailTemplateRequest]) (*connect.Response[mailtemplatev1.UpdateMailTemplateResponse], error) {
	id, err := uuid.Parse(req.Msg.GetId())
	if err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	template := &domain.MailTemplate{
		ID:        id,
		Name:      req.Msg.GetName(),
		Subject:   req.Msg.GetSubject(),
		Body:      req.Msg.GetBody(),
		Variables: req.Msg.GetVariables(),
		UniqueKey: req.Msg.GetUniqueKey().String(),
	}

	updated, err := h.service.UpdateMailTemplate(ctx, template)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&mailtemplatev1.UpdateMailTemplateResponse{
		Message:      "Mail template updated successfully",
		MailTemplate: domainToProto(updated),
	}), nil
}

// ======================= DELETE =======================
func (h *MailTemplateHandler) DeleteMailTemplate(ctx context.Context, req *connect.Request[mailtemplatev1.DeleteMailTemplateRequest]) (*connect.Response[mailtemplatev1.DeleteMailTemplateResponse], error) {
	id, err := uuid.Parse(req.Msg.GetId())
	if err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	if err := h.service.DeleteMailTemplate(ctx, id); err != nil {
		return nil, err
	}

	return connect.NewResponse(&mailtemplatev1.DeleteMailTemplateResponse{
		Message: "Mail template deleted successfully",
	}), nil
}

// ======================= GET =======================
func (h *MailTemplateHandler) GetMailTemplate(ctx context.Context, req *connect.Request[mailtemplatev1.GetMailTemplateRequest]) (*connect.Response[mailtemplatev1.GetMailTemplateResponse], error) {
	id, err := uuid.Parse(req.Msg.GetId())
	if err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	template, err := h.service.GetMailTemplate(ctx, id)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&mailtemplatev1.GetMailTemplateResponse{
		MailTemplate: domainToProto(template),
	}), nil
}

// ======================= LIST =======================
func (h *MailTemplateHandler) ListMailTemplates(ctx context.Context, req *connect.Request[mailtemplatev1.ListMailTemplatesRequest]) (*connect.Response[mailtemplatev1.ListMailTemplatesResponse], error) {
	templates, err := h.service.ListMailTemplates(ctx)
	if err != nil {
		return nil, err
	}

	protoTemplates := make([]*mailtemplatev1.MailTemplate, len(templates))
	for i, t := range templates {
		protoTemplates[i] = domainToProto(t)
	}

	return connect.NewResponse(&mailtemplatev1.ListMailTemplatesResponse{
		MailTemplates: protoTemplates,
	}), nil
}

// domainToProto converts a domain MailTemplate to proto MailTemplate message.
func domainToProto(t *domain.MailTemplate) *mailtemplatev1.MailTemplate {
	if t == nil {
		return nil
	}

	// Convert unique_key string back to proto enum
	uniqueKeyEnum := mailtemplatev1.EmailTemplate(mailtemplatev1.EmailTemplate_value[t.UniqueKey])

	return &mailtemplatev1.MailTemplate{
		Id:        t.ID.String(),
		Name:      t.Name,
		Subject:   t.Subject,
		Body:      t.Body,
		Variables: t.Variables,
		UniqueKey: uniqueKeyEnum,
		CreatedAt: t.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
		UpdatedAt: t.UpdatedAt.Format("2006-01-02T15:04:05Z07:00"),
	}
}
