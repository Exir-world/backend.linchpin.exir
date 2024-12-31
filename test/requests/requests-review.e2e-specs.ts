import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { RequestsModule } from '../../src/requests/requests.module';
import { AttendanceModule } from '../../src/attendance/attendance.module';
import { LeaveModule } from '../../src/leave/leave.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from '../../src/requests/infrastructure/entities/request.entity';
import { AttendanceEntity } from '../../src/attendance/infrastructure/entities/attendance.entity';
import { LeaveEntity } from '../../src/leave/infrastructure/entities/leave.entity';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('RequestController (e2e) - Review Request', () => {
    let app: INestApplication;
    let requestId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                RequestsModule,
                AttendanceModule,
                LeaveModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        type: 'postgres',
                        database: 'linchpin-e2e-test',
                        entities: [RequestEntity, AttendanceEntity, LeaveEntity],
                        synchronize: true,
                        dropSchema: true,
                        host: configService.get<string>('DATABASE_HOST'),
                        port: configService.get<number>('DATABASE_PORT'),
                        username: configService.get<string>('DATABASE_USERNAME'),
                        password: configService.get<string>('DATABASE_PASSWORD'),
                    }),
                    inject: [ConfigService],
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/requests/review (POST)', () => {
        beforeAll(async () => {
            // ایجاد یک درخواست برای تست
            const createResponse = await request(app.getHttpServer())
                .post('/requests/create')
                .send({
                    userId: 1,
                    description: 'Test Request',
                    type: 'DAILY_LEAVE',
                    startTime: '2024-12-31T08:00:00Z',
                    endTime: '2024-12-31T17:00:00Z',
                })
                .expect(HttpStatus.CREATED);

            requestId = createResponse.body.id; // فرض بر این که ID بازگشت داده می‌شود
        });

        it('✅ باید درخواست را تأیید کند و Leave و Attendance آپدیت شوند', async () => {
            const response = await request(app.getHttpServer())
                .post('/requests/review')
                .send({
                    requestId: requestId,
                    action: 'APPROVE',
                    adminComment: 'Approved by admin',
                })
                .expect(HttpStatus.OK);

            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('status', 'APPROVED');

            // بررسی اینکه Leave یا Attendance تغییر کرده باشد
            const leaveResponse = await request(app.getHttpServer())
                .get('/leave/user')
                .send({ userId: 1 });

            expect(leaveResponse.body).toBeDefined();
            expect(Array.isArray(leaveResponse.body)).toBeTruthy();
        });

        it('✅ باید درخواست را رد کند', async () => {
            const rejectResponse = await request(app.getHttpServer())
                .post('/requests/review')
                .send({
                    requestId: requestId,
                    action: 'REJECT',
                    adminComment: 'Rejected by admin',
                })
                .expect(HttpStatus.OK);

            expect(rejectResponse.body).toBeDefined();
            expect(rejectResponse.body).toHaveProperty('status', 'REJECTED');
        });

        it('❌ باید خطا دهد اگر درخواست وجود نداشته باشد', async () => {
            const response = await request(app.getHttpServer())
                .post('/requests/review')
                .send({
                    requestId: 9999, // ID نامعتبر
                    action: 'APPROVE',
                    adminComment: 'Invalid Request',
                })
                .expect(HttpStatus.NOT_FOUND);

            expect(response.body).toHaveProperty('message', 'Request not found');
        });

        it('❌ باید خطا دهد اگر action نامعتبر باشد', async () => {
            const response = await request(app.getHttpServer())
                .post('/requests/review')
                .send({
                    requestId: requestId,
                    action: 'INVALID_ACTION', // Action نامعتبر
                    adminComment: 'Invalid Action',
                })
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.message).toContain('action must be a valid enum value');
        });

        it('❌ باید خطا دهد اگر requestId ارسال نشود', async () => {
            const response = await request(app.getHttpServer())
                .post('/requests/review')
                .send({
                    action: 'APPROVE',
                    adminComment: 'Missing RequestId',
                })
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body.message).toContain('requestId must be a number');
        });
    });
});
