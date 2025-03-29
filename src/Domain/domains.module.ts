import { Module } from '@nestjs/common';
import { DomainService } from './domains.service';
import { DomainController } from './domains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from './domain.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Domain]) ],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
