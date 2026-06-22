package user

import (
	"context"

	"connectrpc.com/connect"
	profilev1 "github.com/ankushx05/authentication/gen/proto/app/profile/v1"
	"github.com/ankushx05/authentication/gen/proto/app/profile/v1/profilev1connect"
	"github.com/ankushx05/authentication/internal/modules/identity/ports"
	"github.com/ankushx05/authentication/internal/platform/auth"
)

var _ profilev1connect.ProfileServiceHandler = (*ProfileHandler)(nil)

type ProfileHandler struct {
	userService ports.UserService
}

func NewProfileHandler(userService ports.UserService) *ProfileHandler {
	return &ProfileHandler{userService: userService}
}

// ======================= GET PROFILE =======================
func (h *ProfileHandler) GetProfile(ctx context.Context, req *connect.Request[profilev1.GetProfileRequest]) (*connect.Response[profilev1.GetProfileResponse], error) {
	claims, err := auth.UserClaimsFrom(ctx)
	if err != nil {
		return nil, connect.NewError(connect.CodeUnauthenticated, err)
	}

	user, err := h.userService.GetUserById(ctx, claims.ID)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&profilev1.GetProfileResponse{
		Fullname: user.Fullname,
		Email:    user.Email,
		Username: user.Username,
	}), nil
}
