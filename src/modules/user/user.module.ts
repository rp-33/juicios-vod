import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '../../repositories/user.repository';
import { MailService } from '../mail/mail.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository
        ])
    ],
    providers: [
        UserService,
        MailService
    ],
    controllers: [UserController],
})
export class UserModule {}
