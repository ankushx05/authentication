package ports

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	"github.com/google/uuid"
)

type UserService interface {
	CreateUser(ctx context.Context, fullname, email, username, password string) (*domain.User, error)
	GetUser(ctx context.Context, id uuid.UUID) (*domain.User, error)
	GetUserByEmail(ctx context.Context, eamil string) (*domain.User, error)
}
