import type { UpdateMailSettingsRequest } from "#/gen/admin/settings/v1/settings_pb";
import { withZodSchema, ZOD_SCHEMA } from "#/lib/zod";
import z from "zod";

type MailSettings = NonNullable<UpdateMailSettingsRequest["settings"]>;

export const mailSettingsSchema = withZodSchema<MailSettings>()({
  host: ZOD_SCHEMA.str().min(1, "Host is required"),
  username: ZOD_SCHEMA.str().min(1, "Username is required"),
  password: ZOD_SCHEMA.str().min(1, "Password is required"),
  encryption: ZOD_SCHEMA.str().min(1, "Encryption is required").default("None"),
});

export type MailSettingsInput = z.input<typeof mailSettingsSchema>;
