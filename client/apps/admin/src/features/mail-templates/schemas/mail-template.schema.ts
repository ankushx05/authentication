import { ZOD_SCHEMA } from "#/lib/zod";
import { EmailTemplate } from "#/gen/admin/mail_template/v1/mail_template_pb";
import z from "zod";

export const mailTemplateSchema = z.object({
  id: z.string().optional(),
  name: ZOD_SCHEMA.str().min(1, "Name is required"),
  subject: ZOD_SCHEMA.str().min(1, "Subject is required"),
  body: ZOD_SCHEMA.str().min(1, "Body is required"),
  uniqueKey: z.coerce.number().pipe(z.enum(EmailTemplate)),
});

export type MailTemplateInput = z.output<typeof mailTemplateSchema>;
export type FormValues = z.input<typeof mailTemplateSchema>;
