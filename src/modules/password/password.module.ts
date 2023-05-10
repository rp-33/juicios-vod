import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../../repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ]),
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [PasswordController],
  providers: [
    PasswordService,
    MailService
  ]
})
export class PasswordModule {}
