package domain

import (
	"time"

	"github.com/google/uuid"
)

type MailTemplate struct {
	ID        uuid.UUID
	Name      string
	Subject   string
	Body      string
	Variables []string
	UniqueKey string
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}
