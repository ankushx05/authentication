import { MailTemplateService } from "#/gen/admin/mail_template/v1/mail_template_pb";

export const listMailTemplatesApi = MailTemplateService.method.listMailTemplates;
export const getMailTemplateApi = MailTemplateService.method.getMailTemplate;
export const createMailTemplateApi = MailTemplateService.method.createMailTemplate;
export const updateMailTemplateApi = MailTemplateService.method.updateMailTemplate;
export const deleteMailTemplateApi = MailTemplateService.method.deleteMailTemplate;
export const getEmailTemplateVariablesApi = MailTemplateService.method.getEmailTemplateVariables;

