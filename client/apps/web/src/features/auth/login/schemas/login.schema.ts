import type { input } from "zod";
import { withZodSchema, ZOD_SCHEMA } from "@/lib/zod";
import type { LoginRequest } from "#/gen/app/auth/v1/auth_pb";

export const loginSchema = withZodSchema<LoginRequest>()({
  email: ZOD_SCHEMA.email(),
  password: ZOD_SCHEMA.password(),
});

export type Login = input<typeof loginSchema>;
