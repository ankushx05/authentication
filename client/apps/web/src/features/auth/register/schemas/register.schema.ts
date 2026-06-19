import type { input } from "zod";
import { withZodSchema, ZOD_SCHEMA } from "@/lib/zod";
import type { RegisterRequest } from "#/gen/app/auth/v1/auth_pb";

export const registerSchema = withZodSchema<RegisterRequest>()({
  email: ZOD_SCHEMA.email(),
  fullname: ZOD_SCHEMA.str().min(1, "Full name is required"),
  username: ZOD_SCHEMA.username(),
  password: ZOD_SCHEMA.password(),
});

export type Register = input<typeof registerSchema>;
