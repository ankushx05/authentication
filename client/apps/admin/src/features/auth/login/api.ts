import { AuthService } from "#/gen/admin/auth/v1/auth_pb";

export const loginApi = AuthService.method.login;
export const logoutApi = AuthService.method.logout;
