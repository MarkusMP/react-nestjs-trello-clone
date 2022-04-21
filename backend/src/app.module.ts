import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseService } from './modules/database/database.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseService.getTypeOrmConfig()),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
