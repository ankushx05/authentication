package repository

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	"github.com/ankushx05/authentication/internal/modules/identity/ports"
	"github.com/ankushx05/authentication/internal/platform/database/ent"
	"github.com/ankushx05/authentication/internal/platform/database/ent/user"
	"github.com/google/uuid"
)

type entUserRepository struct {
	client *ent.Client
}

func NewEntUserRepository(client *ent.Client) ports.UserRepository {
	return &entUserRepository{client: client}
}

func (r *entUserRepository) Create(ctx context.Context, u *domain.User) (*domain.User, error) {
	res, err := r.client.User.
		Create().
		SetEmail(u.Email).
		SetFullname(u.Fullname).
		SetUsername(u.Username).
		SetPassword(u.Password).
		Save(ctx)

	if err != nil {
		return nil, err
	}

	return r.mapToDomain(res), nil
}

func (r *entUserRepository) GetByID(ctx context.Context, id uuid.UUID) (*domain.User, error) {
	user, err := r.client.User.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return r.mapToDomain(user), nil
}

func (r *entUserRepository) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	user, err := r.client.User.Query().
		Where(user.Email(email)).
		Only(ctx)
	if err != nil {
		return nil, err
	}
	return r.mapToDomain(user), nil
}

func (r *entUserRepository) GetByUsername(ctx context.Context, username string) (*domain.User, error) {
	user, err := r.client.User.Query().
		Where(user.Username(username)).
		Only(ctx)
	if err != nil {
		return nil, err
	}
	return r.mapToDomain(user), nil
}

func (r *entUserRepository) mapToDomain(u *ent.User) *domain.User {
	if u == nil {
		return nil
	}
	return &domain.User{
		ID:        u.ID,
		Email:     u.Email,
		Fullname:  u.Fullname,
		Username:  u.Username,
		Password:  u.Password,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
		DeletedAt: u.DeletedAt,
	}
}
