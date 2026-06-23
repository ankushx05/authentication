package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Setting holds the schema definition for the Setting entity.
type Setting struct {
	ent.Schema
}

type MailSettings struct {
	Host        string `json:"host"`
	Port        int    `json:"port"`
	Username    string `json:"username"`
	Password    string `json:"password"`
	Encryption  string `json:"encryption"`
	SenderEmail string `json:"sender_email"`
	SenderName  string `json:"sender_name"`
}

// Fields of the Setting.
func (Setting) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			Immutable(),
		field.JSON("mail", &MailSettings{}).Optional(),
		field.String("unique_id").Unique().Nillable(),
	}
}

// Edges of the Setting.
func (Setting) Edges() []ent.Edge {
	return nil
}
