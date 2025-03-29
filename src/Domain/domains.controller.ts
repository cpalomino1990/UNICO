import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { DomainService } from './domains.service';

@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  // Agregar un nuevo dominio
  @Post()
  async addDomain(@Body('name') name: string) {
    return this.domainService.addDomain(name);
  }

  // Obtener todos los dominios autorizados
  @Get()
  async getAllDomains() {
    return this.domainService.getAllDomains();
  }

  // Eliminar un dominio por su ID
  @Delete(':id')
  async removeDomain(@Param('id') id: number) {
    return this.domainService.removeDomain(id);
  }

  // Validar si un dominio está autorizado
  @Get('validate/:domain')
  async validateDomain(@Param('domain') domain: string) {
    return { authorized: await this.domainService.isDomainAuthorized(domain) };
  }
}