import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { AttendanceModule } from '../../src/attendance/attendance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from '../../src/attendance/infrastructure/entities/attendance.entity';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkReportEntity } from 'src/attendance/infrastructure/entities/work-report.entity';
import { StopEntity } from 'src/attendance/infrastructure/entities/stop.entity';
import { DataSource } from 'typeorm';

describe('AttendanceController (e2e) - Check-In', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: '.env.test',
                    isGlobal: true,
                }),
                AttendanceModule,
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => {
                        return {
                            type: 'postgres',
                            synchronize: true,
                            database: 'linchpin-e2e-test',
                            entities: [AttendanceEntity, WorkReportEntity, StopEntity],
                            host: configService.get<string>('DATABASE_HOST'),
                            port: configService.get<number>('DATABASE_PORT'),
                            username: configService.get<string>('DATABASE_USERNAME'),
                            password: configService.get<string>('DATABASE_PASSWORD'),
                            passfile: null
                        }
                    },
                    inject: [ConfigService],
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        if (app) {
            await app.close();
        }
        const dataSource = app.get(DataSource);
        if (dataSource && dataSource.isInitialized) {
            await dataSource.destroy(); // بستن اتصال دیتابیس
        }
    });

    describe('/attendance/check-in (POST)', () => {
        it('✅ باید ورود کاربر را با موفقیت ثبت کند', async () => {
            const response = await request(app.getHttpServer())
                .post('/attendance/check-in')
                .send({ userId: 1 })
                .expect(HttpStatus.OK);

            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('message', 'ورود با موفقیت ثبت شد.');
        });

        it('❌ باید خطا دهد اگر کاربر قبلاً ورود ثبت کرده باشد و خروج نکرده باشد', async () => {
            // ثبت ورود اول
            await request(app.getHttpServer())
                .post('/attendance/check-in')
                .send({ userId: 2 })
                .expect(HttpStatus.OK);

            // تلاش برای ثبت ورود دوم بدون خروج
            const response = await request(app.getHttpServer())
                .post('/attendance/check-in')
                .send({ userId: 2 })
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message', 'You are already checked in!');
        });

        it('❌ باید خطا دهد اگر userId ارسال نشود', async () => {
            const response = await request(app.getHttpServer())
                .post('/attendance/check-in')
                .send({})
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.message)
                // .toContain('userId must be a number')
                ;
        });
    });
});
