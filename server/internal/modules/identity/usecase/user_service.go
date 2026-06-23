package usecase

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/identity/domain"
	"github.com/ankushx05/authentication/internal/modules/identity/ports"
	"github.com/ankushx05/authentication/internal/pkg/errors"
	"github.com/google/uuid"
)

var _ ports.UserService = (*UserService)(nil)

type UserService struct {
	repo ports.UserRepository
}

func NewUserService(repo ports.UserRepository) *UserService {
	return &UserService{repo}
}

// Register User
// @TODO: Add password encryption
func (s *UserService) CreateUser(ctx context.Context, fullname, email, username, password string) (*domain.User, error) {
	existing, _ := s.repo.GetByEmail(ctx, email)
	if existing != nil {
		return nil, errors.NewAlreadyExists("user", "email", email)
	}

	existing, _ = s.repo.GetByUsername(ctx, username)
	if existing != nil {
		return nil, errors.NewAlreadyExists("user", "username", username)
	}

	user := &domain.User{
		Fullname: fullname,
		Email:    email,
		Username: username,
		Password: password,
	}

	created, err := s.repo.Create(ctx, user)
	if err != nil {
		return nil, errors.NewInternal(err)
	}

	return created, nil
}

// Login User
// @TODO: Add password encryption and JWT token generation
func (s *UserService) Login(ctx context.Context, email, password string) (*domain.User, error) {
	user, err := s.repo.GetByEmail(ctx, email)
	if err != nil || user == nil {
		return nil, errors.NewUnauthorized("invalid email or password")
	}

	if user.Password != password {
		return nil, errors.NewUnauthorized("invalid email or password")
	}

	return user, nil
}

// Admin Login
func (s *UserService) AdminLogin(ctx context.Context, email, password string) (*domain.User, error) {
	user, err := s.repo.GetByEmail(ctx, email)
	if err != nil || user == nil {
		return nil, errors.NewUnauthorized("invalid email or password")
	}

	if user.Password != password {
		return nil, errors.NewUnauthorized("invalid email or password")
	}

	if !user.IsAdmin {
		return nil, errors.NewUnauthorized("unauthorized: not an admin")
	}

	return user, nil
}

func (s *UserService) GetUser(ctx context.Context, id uuid.UUID) (*domain.User, error) {
	user, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, errors.NewNotFound("user", id.String())
	}
	return user, nil
}

func (s *UserService) GetUserByEmail(ctx context.Context, email string) (*domain.User, error) {
	user, err := s.repo.GetByEmail(ctx, email)
	if err != nil {
		return nil, errors.NewNotFound("user", email)
	}
	return user, nil
}

func (s *UserService) GetUserById(ctx context.Context, id string) (*domain.User, error) {
	user, err := s.repo.GetByID(ctx, uuid.MustParse(id))
	if err != nil {
		return nil, errors.NewNotFound("user", id)
	}
	return user, nil
}
