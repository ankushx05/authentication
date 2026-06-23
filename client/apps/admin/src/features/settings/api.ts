import { SettingsService } from "#/gen/admin/settings/v1/settings_pb";

export const getMailSettingsApi = SettingsService.method.getMailSettings;
export const updateMailSettingsApi = SettingsService.method.updateMailSettings;
