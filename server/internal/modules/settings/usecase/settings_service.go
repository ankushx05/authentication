package usecase

import (
	"context"

	"github.com/ankushx05/authentication/internal/modules/settings/domain"
	"github.com/ankushx05/authentication/internal/modules/settings/ports"
	"github.com/ankushx05/authentication/internal/platform/config"
)

type settingsService struct {
	repo ports.SettingsRepository
}

func NewSettingsService(repo ports.SettingsRepository) ports.SettingsService {
	return &settingsService{repo: repo}
}

func (s *settingsService) GetMailSettings(ctx context.Context) (*domain.MailSettings, error) {
	setting, err := s.repo.GetByUniqueID(ctx, config.SETTING_UNIQUE_ID)
	if err != nil {
		return nil, err
	}

	if setting == nil || setting.Mail == nil {
		return &domain.MailSettings{}, nil
	}

	return setting.Mail, nil
}

func (s *settingsService) UpdateMailSettings(ctx context.Context, mailSettings *domain.MailSettings) (*domain.MailSettings, error) {
	setting, err := s.repo.GetByUniqueID(ctx, config.SETTING_UNIQUE_ID)
	if err != nil {
		return nil, err
	}

	if setting == nil {
		setting = &domain.Setting{
			UniqueID: config.SETTING_UNIQUE_ID,
		}
	}

	setting.Mail = mailSettings

	savedSetting, err := s.repo.Save(ctx, setting)
	if err != nil {
		return nil, err
	}

	return savedSetting.Mail, nil
}
