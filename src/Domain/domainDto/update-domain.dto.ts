import { PartialType } from '@nestjs/swagger';
import { CreateDomainDto } from '../domainDto/create-domain.dto';

export class UpdateDomainDto extends PartialType(CreateDomainDto) {}

