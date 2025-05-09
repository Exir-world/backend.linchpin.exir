import { UserEmploymentSettings } from "src/user-employment-settings/domain/user-employment-settings.domain";

export interface UserEmploymentSettingsSharedPort {
    getSettingsByUserId(userId: number): Promise<UserEmploymentSettings>;
    getSettingsByUsersId(userIds: number[]): Promise<UserEmploymentSettings[]>;
    getSettingsForAll(): Promise<UserEmploymentSettings[]>;
    createSettings(userId: number, shiftId: number, teamId: number, needToLocation: boolean, salary: number): Promise<UserEmploymentSettings>;
    updateSettings(userId: number, settings: Partial<UserEmploymentSettings>): Promise<UserEmploymentSettings>;
}