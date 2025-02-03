import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Tokens } from '../interfaces/token.interface';
import { LoginCommand } from '../commands/login.command';
import { RefreshTokenCommand } from '../commands/refresh-token.command';

@Injectable()
export class AuthService {
    constructor(private readonly commandBus: CommandBus) { }

    async login(command: LoginCommand): Promise<Tokens> {
        return this.commandBus.execute(command);
    }

    async refreshToken(command: RefreshTokenCommand): Promise<Tokens> {
        return this.commandBus.execute(command);
    }
}
