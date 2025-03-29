import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './Domain/domains.module';
import { Domain } from './Domain/domain.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'widget',
      entities: [User,Domain],
      synchronize: true,// change to false in production
    }),
    UserModule,
    AuthModule,
    DomainModule,
  
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
