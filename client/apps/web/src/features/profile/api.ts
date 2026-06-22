import { ProfileService } from "#/gen/app/profile/v1/profile_pb";

export const getProfileApi = ProfileService.method.getProfile;
