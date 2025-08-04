import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/auth/domain/user';
import { BadRequestException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserEmploymentSettingsSharedPort } from 'src/user-employment-settings/application/ports/user-employment-settings-shared.port';
import { RolesRepository } from 'src/auth/infrastructure/repositories/role.repository';
import { RoleMapper } from 'src/auth/infrastructure/mappers/role.mapper';
import { RegisterUserDto } from 'src/auth/presentation/dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly i18n: I18nService,
        private readonly configService: ConfigService,
        private httpService: HttpService,
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RolesRepository,
        @Inject('UserEmploymentSettingsSharedPort')
        private readonly userEmploymentSettingsSharedPort: UserEmploymentSettingsSharedPort,
    ) { }

    async execute(command: CreateUserCommand): Promise<User> {
        const role = await this.roleRepository.findOne({ where: { id: command.role } });
        if (!role) {
            throw new NotFoundException(`Role with ID ${command.role} not found.`);
        }

        console.log('Creating user with command:', command);


        const { id, userData } = await this.registerApi({ phoneNumber: command.phoneNumber, email: command.email, password: command.password, nickname: command.name });

        const user = new User(
            command.organizationId,
            command.firstname,
            userData?.name || command.name,
            userData.email,
            command.profileImage,
            command.lastname,
            userData.phoneNumber.startsWith('+') ? userData.phoneNumber : '+' + userData.phoneNumber,
            command.password,
            RoleMapper.toDomain(role),
            command.nationalCode,
            command.personnelCode,
            false,
            false,
            0
        );
        const newUser = await this.userRepository.save(user);

        if (command.settings) {
            await this.userEmploymentSettingsSharedPort.createSettings(
                newUser.id,
                command.settings.shiftId,
                command.settings.teamId,
                command.settings.needToLocation,
                command.settings.salary
            );
        }

        return newUser;
    }

    async registerApi(registerUserDto: RegisterUserDto): Promise<any> {
        const id = await this.checkUserExistenceApi(registerUserDto.phoneNumber);

        console.log(id);


        if (id) {
            const userData = await this.getUserApi(id);
            console.log(userData);
            return { id, userData };
        }

        const url = `${this.configService.get('PID_URL')}/api/user`;


        const data = {
            phone: registerUserDto.phoneNumber,
            email: registerUserDto.email,
            password: registerUserDto.password,
            nickname: registerUserDto.nickname
        };

        try {
            const response = await lastValueFrom(
                this.httpService.post(url, data, {
                    headers: { 'Content-Type': 'application/json' },
                }),
            );

            if ([200, 201].includes(response.status)) {
                return { id: response.data.data.id, userData: { ...registerUserDto, name: registerUserDto.nickname } };
            } else if (response.status === 409) {
                throw new BadRequestException(this.i18n.t('common.user.conflict'));
            } else {
                throw new BadRequestException(this.i18n.t('common.user.registerError'));
            }
        } catch (error) {
            // Handle specific Axios errors
            if (error.response) {
                const { status, data, message } = error.response;
                console.log(data, message);

                if (status === 409) {
                    throw new BadRequestException(this.i18n.t('common.user.conflict'));
                } else {
                    throw new BadRequestException(this.i18n.t('common.user.registerError'));
                }
            }

            // For other types of errors (network issues, etc.)
            throw new InternalServerErrorException();
        }
    }

    async checkUserExistenceApi(phone: string): Promise<number> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.configService.get('PID_URL')}/api/user/check/exist`, {
                    params: { phone },
                }),
            );

            return response.data.data.isExist == false ? null : response.data.data.userId;
        } catch (error) {
            console.error('Error checking user existence:', error.response?.data || error.message);
            throw error;
        }
    }

    async getUserApi(userId: number): Promise<any> {
        try {
            const response = await lastValueFrom(
                this.httpService.get(
                    `${this.configService.get('PID_URL')}/api/user/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${this.configService.get('PID_ADMIN_ACCESS_TOKEN')}`
                        }
                    }
                ),
            );

            return {
                phoneNumber: response.data.data?.phone,
                name: response.data.data?.nickname,
                email: response.data.data?.email,
            };
        } catch (error) {
            console.log('Error fetching user data:', error.response?.data || error.message);

            return null;
        }
    }
}
