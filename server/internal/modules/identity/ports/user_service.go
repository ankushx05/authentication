package ports

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	"github.com/google/uuid"
)

type UserService interface {
	CreateUser(ctx context.Context, fullname, email, username, password string) (*domain.User, error)
	Login(ctx context.Context, email, password string) (*domain.User, error)
	GetUser(ctx context.Context, id uuid.UUID) (*domain.User, error)
	GetUserByEmail(ctx context.Context, email string) (*domain.User, error)
	GetUserById(ctx context.Context, id string) (*domain.User, error)
}
