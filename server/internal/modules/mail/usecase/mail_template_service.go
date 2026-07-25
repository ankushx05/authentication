package usecase

import (
	"context"
	"crypto/tls"
	"fmt"
	"strings"

	"github.com/ankushx05/authentication/internal/modules/mail/domain"
	"github.com/ankushx05/authentication/internal/modules/mail/ports"
	settingsPorts "github.com/ankushx05/authentication/internal/modules/settings/ports"
	"github.com/ankushx05/authentication/internal/pkg/errors"
	"github.com/ankushx05/authentication/internal/platform/logger"
	"github.com/google/uuid"
	"gopkg.in/gomail.v2"
)

var _ ports.MailTemplateService = (*MailTemplateService)(nil)

type MailTemplateService struct {
	repo            ports.MailTemplateRepository
	settingsService settingsPorts.SettingsService
}

func NewMailTemplateService(repo ports.MailTemplateRepository, settingsService settingsPorts.SettingsService) *MailTemplateService {
	return &MailTemplateService{repo: repo, settingsService: settingsService}
}

func (s *MailTemplateService) CreateMailTemplate(ctx context.Context, template *domain.MailTemplate) (*domain.MailTemplate, error) {
	created, err := s.repo.Create(ctx, template)
	if err != nil {
		return nil, errors.NewInternal(err)
	}
	return created, nil
}

func (s *MailTemplateService) UpdateMailTemplate(ctx context.Context, template *domain.MailTemplate) (*domain.MailTemplate, error) {
	// Verify template exists
	_, err := s.repo.GetByID(ctx, template.ID)
	if err != nil {
		return nil, errors.NewNotFound("mail template", template.ID.String())
	}

	updated, err := s.repo.Update(ctx, template)
	if err != nil {
		return nil, errors.NewInternal(err)
	}
	return updated, nil
}

func (s *MailTemplateService) DeleteMailTemplate(ctx context.Context, id uuid.UUID) error {
	// Verify template exists
	_, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return errors.NewNotFound("mail template", id.String())
	}

	if err := s.repo.Delete(ctx, id); err != nil {
		return errors.NewInternal(err)
	}
	return nil
}

func (s *MailTemplateService) GetMailTemplate(ctx context.Context, id uuid.UUID) (*domain.MailTemplate, error) {
	template, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, errors.NewNotFound("mail template", id.String())
	}
	return template, nil
}

func (s *MailTemplateService) ListMailTemplates(ctx context.Context) ([]*domain.MailTemplate, error) {
	templates, err := s.repo.List(ctx)
	if err != nil {
		return nil, errors.NewInternal(err)
	}
	return templates, nil
}

func (s *MailTemplateService) SendMail(ctx context.Context, uniqueKey string, variables map[string]string, toEmail string) error {
	log := logger.New()
	// 1. Fetch the template by unique_key
	template, err := s.repo.GetByUniqueKey(ctx, uniqueKey)
	if err != nil {
		return fmt.Errorf("mail template not found for key %s: %w", uniqueKey, err)
	}

	// 2. Replace variables in subject and body
	subject := replaceVariables(template.Subject, variables)
	body := replaceVariables(template.Body, variables)

	log.Debug("Mail Template", "subject", subject, "body", body)

	// 3. Fetch SMTP settings
	mailSettings, err := s.settingsService.GetMailSettings(ctx)
	if err != nil {
		return fmt.Errorf("failed to get mail settings: %w", err)
	}

	if mailSettings.Host == "" || mailSettings.Username == "" || mailSettings.Password == "" {
		return fmt.Errorf("mail settings are not configured")
	}

	// 4. Derive port from encryption type
	port := derivePort(mailSettings.Encryption)

	log.Debug("Mail Settings", "host", mailSettings.Host, "port", port, "username", mailSettings.Username, "password", mailSettings.Password)
	// 5. Send email using gomail
	m := gomail.NewMessage()
	m.SetHeader("From", mailSettings.Username)
	m.SetHeader("To", toEmail)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)

	d := gomail.NewDialer(mailSettings.Host, port, mailSettings.Username, mailSettings.Password)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	log.Debug("Dialer", "dialer", d)

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	log.Debug("Email Sent", "to", toEmail, "message", m)

	return nil
}

// replaceVariables replaces all {{key}} placeholders in the text with values from the variables map.
func replaceVariables(text string, variables map[string]string) string {
	for key, value := range variables {
		placeholder := "{{" + key + "}}"
		text = strings.ReplaceAll(text, placeholder, value)
	}
	return text
}

// derivePort returns the SMTP port based on the encryption type.
func derivePort(encryption string) int {
	switch strings.ToUpper(encryption) {
	case "SSL":
		return 465
	case "TLS":
		return 587
	default:
		return 25
	}
}
