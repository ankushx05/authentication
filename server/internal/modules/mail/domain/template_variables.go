package domain

// EmailTemplateVariables defines the accepted variables for each email template type.
// This is the single source of truth on the server side for variable names per template.
var EmailTemplateVariables = map[string][]string{
	"EMAIL_TEMPLATE_ADMIN_LOGIN":          {"name", "email", "otp"},
	"EMAIL_TEMPLATE_USER_LOGIN":           {"name", "email", "otp"},
	"EMAIL_TEMPLATE_USER_REGISTER":        {"name", "email", "username"},
	"EMAIL_TEMPLATE_USER_FORGOT_PASSWORD": {"name", "email", "otp", "reset_link"},
}

// GetVariablesForTemplate returns the accepted variables for a given template unique key.
// Returns nil if the template key is not found in the registry.
func GetVariablesForTemplate(uniqueKey string) []string {
	vars, ok := EmailTemplateVariables[uniqueKey]
	if !ok {
		return nil
	}
	return vars
}
