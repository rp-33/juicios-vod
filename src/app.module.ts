import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RepositoryModule } from './repositories/repository.module';
import { AudienceModule } from './modules/audience/audience.module';
import { ExpedientModule } from './modules/expedient/expedient.module';
import { TranscriptionAudienceModule } from './modules/transcription-audience/transcription-audience.module';
import { PasswordModule } from './modules/password/password.module';
import { RolesModule } from './modules/roles/roles.module';
import { TypeModule } from './modules/type/type.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    DatabaseModule, 
    RepositoryModule,
    AuthModule,
    UserModule,
    AudienceModule,
    ExpedientModule,
    TranscriptionAudienceModule,
    PasswordModule,
    RolesModule,
    TypeModule
  ],
})
export class AppModule {
  static port : number | string;
  constructor(){
    AppModule.port = process.env.PORT || 8088;
  }
}
