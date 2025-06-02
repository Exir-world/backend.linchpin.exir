import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SharedUsersService } from './shared-user.service';

@Module({
    imports: [AuthModule],
    providers: [
        SharedUsersService,
    ],
    exports: [SharedUsersService],
})
export class SharedUsersModule { }
