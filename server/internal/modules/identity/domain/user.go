package domain

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID
	Fullname  string
	Email     string
	Username  string
	Password  string
	IsAdmin   bool
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

type TokenPayload struct {
	ID       string `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
}
