package repository

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/settings/domain"
	"github.com/ankushx05/authentication/internal/modules/settings/ports"
	"github.com/ankushx05/authentication/internal/platform/database/ent"
	"github.com/ankushx05/authentication/internal/platform/database/ent/schema"
	"github.com/ankushx05/authentication/internal/platform/database/ent/setting"
)

type entSettingsRepository struct {
	client *ent.Client
}

func NewEntSettingsRepository(client *ent.Client) ports.SettingsRepository {
	return &entSettingsRepository{client: client}
}

func (r *entSettingsRepository) GetByUniqueID(ctx context.Context, uniqueID string) (*domain.Setting, error) {
	res, err := r.client.Setting.Query().
		Where(setting.UniqueID(uniqueID)).
		Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, err
	}

	return r.mapToDomain(res), nil
}

func (r *entSettingsRepository) Save(ctx context.Context, s *domain.Setting) (*domain.Setting, error) {
	existing, err := r.client.Setting.Query().
		Where(setting.UniqueID(s.UniqueID)).
		Only(ctx)

	var res *ent.Setting
	if err != nil {
		if ent.IsNotFound(err) {
			var entMail *schema.MailSettings
			if s.Mail != nil {
				entMail = &schema.MailSettings{
					Host:       s.Mail.Host,
					Username:   s.Mail.Username,
					Password:   s.Mail.Password,
					Encryption: s.Mail.Encryption,
				}
			}
			res, err = r.client.Setting.Create().
				SetUniqueID(s.UniqueID).
				SetMail(entMail).
				Save(ctx)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	} else {
		var entMail *schema.MailSettings
		if s.Mail != nil {
			entMail = &schema.MailSettings{
				Host:       s.Mail.Host,
				Username:   s.Mail.Username,
				Password:   s.Mail.Password,
				Encryption: s.Mail.Encryption,
			}
		}
		res, err = existing.Update().
			SetMail(entMail).
			Save(ctx)
		if err != nil {
			return nil, err
		}
	}

	return r.mapToDomain(res), nil
}

func (r *entSettingsRepository) mapToDomain(s *ent.Setting) *domain.Setting {
	if s == nil {
		return nil
	}
	var mail *domain.MailSettings
	if s.Mail != nil {
		mail = &domain.MailSettings{
			Host:       s.Mail.Host,
			Username:   s.Mail.Username,
			Password:   s.Mail.Password,
			Encryption: s.Mail.Encryption,
		}
	}
	uniqueID := ""
	if s.UniqueID != nil {
		uniqueID = *s.UniqueID
	}
	return &domain.Setting{
		UniqueID: uniqueID,
		Mail:     mail,
	}
}
