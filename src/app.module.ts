import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvValidationSchema } from './config/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { AttendanceModule } from './attendance/attendance.module';
import { LeaveModule } from './leave/leave.module';
import { PayrollModule } from './payroll/payroll.module';
import { RequestsModule } from './requests/requests.module';
import { OrganizationModule } from './organization/organization.module';
import { TasksModule } from './tasks/tasks.module';
import { ShiftsModule } from './shifts/shifts.module';
import { UserEmploymentSettingsModule } from './user-employment-settings/user-employment-settings.module';
import * as path from 'path';
import { UserSelfImprovementModule } from './user-self-improvement/user-self-improvement.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: EnvValidationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),

    // Modules
    AuthModule,
    AttendanceModule,
    LeaveModule,
    PayrollModule,
    RequestsModule,
    OrganizationModule,
    UserSelfImprovementModule,
    TasksModule,
    ShiftsModule,
    UserEmploymentSettingsModule,
    NotificationsModule,
  ],
  providers: [ResponseInterceptor],
})
export class AppModule { }
