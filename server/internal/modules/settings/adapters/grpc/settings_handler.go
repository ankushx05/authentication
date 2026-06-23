package grpc

import (
	"context"

	"connectrpc.com/connect"
	settingsv1 "github.com/ankushx05/authentication/gen/proto/admin/settings/v1"
	"github.com/ankushx05/authentication/gen/proto/admin/settings/v1/settingsv1connect"
	"github.com/ankushx05/authentication/internal/modules/settings/domain"
	"github.com/ankushx05/authentication/internal/modules/settings/ports"
)

var _ settingsv1connect.SettingsServiceHandler = (*SettingsHandler)(nil)

type SettingsHandler struct {
	settingsService ports.SettingsService
}

func NewSettingsHandler(settingsService ports.SettingsService) *SettingsHandler {
	return &SettingsHandler{settingsService: settingsService}
}

func (h *SettingsHandler) GetMailSettings(ctx context.Context, req *connect.Request[settingsv1.GetMailSettingsRequest]) (*connect.Response[settingsv1.GetMailSettingsResponse], error) {
	mail, err := h.settingsService.GetMailSettings(ctx)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&settingsv1.GetMailSettingsResponse{
		Settings: &settingsv1.MailSettings{
			Host:       mail.Host,
			Username:   mail.Username,
			Password:   mail.Password,
			Encryption: mail.Encryption,
		},
	}), nil
}

func (h *SettingsHandler) UpdateMailSettings(ctx context.Context, req *connect.Request[settingsv1.UpdateMailSettingsRequest]) (*connect.Response[settingsv1.UpdateMailSettingsResponse], error) {
	s := req.Msg.GetSettings()
	if s == nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, nil)
	}

	_, err := h.settingsService.UpdateMailSettings(ctx, &domain.MailSettings{
		Host:       s.Host,
		Username:   s.Username,
		Password:   s.Password,
		Encryption: s.Encryption,
	})
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&settingsv1.UpdateMailSettingsResponse{
		Message: "Mail settings updated successfully",
	}), nil
}
