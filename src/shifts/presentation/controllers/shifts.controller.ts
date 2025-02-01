import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Shift } from "src/shifts/domain/shift.domain";
import { CreateShiftDto } from "../dto/create-shift.dto";
import { CreateShiftCommand } from "src/shifts/application/commands/create-shift.command";
import { GetShiftsByOrganizationQuery } from "src/shifts/application/queries/get-shifts-by-organization.query";

@ApiTags("Shifts")
@Controller("shifts")
export class ShiftsController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @ApiOperation({ summary: "Create a new shift with its times" })
    @ApiResponse({ status: 201, description: "Shift created successfully", type: Shift })
    async createShift(@Body() createShiftDto: CreateShiftDto): Promise<Shift> {
        return this.commandBus.execute(new CreateShiftCommand(createShiftDto));
    }

    @Get("organization/:organizationId")
    @ApiOperation({ summary: "Get shifts with times by organization ID" })
    @ApiResponse({ status: 200, description: "List of shifts", type: [Shift] })
    async getShiftsByOrganization(@Param("organizationId") organizationId: number): Promise<Shift[]> {
        return this.queryBus.execute(new GetShiftsByOrganizationQuery(organizationId));
    }
}
