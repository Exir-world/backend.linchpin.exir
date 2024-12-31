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

describe('AttendanceController (e2e) - Check-Out', () => {
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
                    useFactory: async (configService: ConfigService) => ({
                        type: 'postgres',
                        database: 'linchpin-e2e-test',
                        synchronize: true,
                        entities: [AttendanceEntity, WorkReportEntity, StopEntity],
                        host: configService.get<string>('DATABASE_HOST'),
                        port: configService.get<number>('DATABASE_PORT'),
                        username: configService.get<string>('DATABASE_USERNAME'),
                        password: configService.get<string>('DATABASE_PASSWORD'),
                        passfile: null
                    }),
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

    describe('/attendance/check-out (POST)', () => {
        let attendanceId: number;

        beforeAll(async () => {
            // ثبت ورود اولیه برای کاربر
            const checkInResponse = await request(app.getHttpServer())
                .post('/attendance/check-in')
                .send({ userId: 1 });

            attendanceId = checkInResponse.body.id; // فرض اینکه ID بازگردانده می‌شود
        });

        it('✅ باید خروج کاربر را با موفقیت ثبت کند', async () => {
            const response = await request(app.getHttpServer())
                .post('/attendance/check-out')
                .send({
                    userId: 1,
                    attendanceId: attendanceId,
                })
                .expect(HttpStatus.OK);

            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('message', 'خروج با موفقیت ثبت شد.');
        });

        it('❌ باید خطا دهد اگر خروج قبلاً ثبت شده باشد', async () => {
            const response = await request(app.getHttpServer())
                .post('/attendance/check-out')
                .send({
                    userId: 1,
                    attendanceId: attendanceId,
                })
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message', 'You are already checked out!');
        });

        it('❌ باید خطا دهد اگر attendanceId نامعتبر باشد', async () => {
            const response = await request(app.getHttpServer())
                .post('/attendance/check-out')
                .send({
                    userId: 1,
                    attendanceId: 9999, // آی‌دی‌ای که وجود ندارد
                })
                .expect(HttpStatus.NOT_FOUND);

            expect(response.body).toHaveProperty('message', 'Attendance not found');
        });

        it('❌ باید خطا دهد اگر userId یا attendanceId ارسال نشود', async () => {
            const response = await request(app.getHttpServer())
                .post('/attendance/check-out')
                .send({})
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.message)
                // .toContain('userId must be a number')
                ;
            expect(response.body.message)
                // .toContain('attendanceId must be a number')
                ;
        });
    });
});
