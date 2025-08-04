import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserEmploymentSettingsDto } from "../dto/create-user-employment-settings.dto";
import { UserEmploymentSettings } from "src/user-employment-settings/domain/user-employment-settings.domain";
import { CreateUserEmploymentSettingsCommand } from "src/user-employment-settings/application/commands/create-user-employment-settings.command";
import { GetUserEmploymentSettingsQuery } from "src/user-employment-settings/application/queries/get-user-employment-settings.query";
import { Delete, Query } from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";
import { RemoveDeviceUniqueCodeByUserIdCommand } from "src/user-employment-settings/application/commands/remove-device-unique-code.command";

@ApiTags("User Employment Settings")
@Controller("user-employment-settings")
export class UserEmploymentSettingsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: "Create employment settings for a user" })
    @ApiResponse({ status: 201, description: "Employment settings created successfully", type: UserEmploymentSettings })
    async createUserEmploymentSettings(
        @Body() dto: CreateUserEmploymentSettingsDto
    ): Promise<UserEmploymentSettings> {
        return this.commandBus.execute(new CreateUserEmploymentSettingsCommand(
            dto.userId,
            dto.shiftId,
            dto.salary,
            dto.needLocation,
            dto.teamId,
        ));
    }

    @Get(":userId")
    @ApiOperation({ summary: "Get employment settings by user ID" })
    @ApiResponse({ status: 200, description: "List of employment settings", type: [UserEmploymentSettings] })
    async getUserEmploymentSettings(@Param("userId") userId: number): Promise<UserEmploymentSettings[]> {
        return this.queryBus.execute(new GetUserEmploymentSettingsQuery(userId));
    }

    @Delete("remove-device-unique-code")
    @ApiOperation({ summary: "Remove deviceUniqueCode by userId (admin only)" })
    @ApiParam({ name: "userId", type: Number, required: true })
    @ApiResponse({ status: 200, description: "Device unique code removed successfully" })
    async removeDeviceUniqueCodeByUserId(@Query("userId") userId: number): Promise<{ success: boolean }> {
        await this.commandBus.execute(new RemoveDeviceUniqueCodeByUserIdCommand(userId));
        return { success: true };
    }
}
