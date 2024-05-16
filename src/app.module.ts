import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    ReviewsModule,
    ConfigurationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
