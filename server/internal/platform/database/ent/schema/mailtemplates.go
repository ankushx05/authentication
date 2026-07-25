package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/ankushx05/authentication/internal/platform/database/ent/schema/mixins"
)

// MailTemplates holds the schema definition for the MailTemplates entity.
type MailTemplates struct {
	ent.Schema
}

// Fields of the MailTemplates.
func (MailTemplates) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty(),
		field.String("subject").NotEmpty(),
		field.String("body").NotEmpty(),
		field.JSON("variables", []string{}).Optional(),
		field.String("unique_key").NotEmpty().Unique(),
	}
}

func (MailTemplates) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixins.BaseMixin{},
		mixins.SoftDeleteMixin{},
	}
}

// Edges of the MailTemplates.
func (MailTemplates) Edges() []ent.Edge {
	return nil
}
