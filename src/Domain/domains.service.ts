// src/domains/domain.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Domain } from './domain.entity';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private domainRepository: Repository<Domain>,
  ) {}

  // Agregar un nuevo dominio autorizado
  async addDomain(name: string): Promise<Domain> {
    const domain = this.domainRepository.create({ name });
    return this.domainRepository.save(domain);
  }

  // Obtener todos los dominios autorizados
  async getAllDomains(): Promise<Domain[]> {
    return this.domainRepository.find();
  }

  // Eliminar un dominio autorizado
  async removeDomain(id: number): Promise<void> {
    await this.domainRepository.delete(id);
  }

  // Validar si un dominio está autorizado
  async isDomainAuthorized(domainName: string): Promise<boolean> {
    const domain = await this.domainRepository.findOne({ where: { name: domainName } });
    return !!domain; // Retorna true si existe, false si no
  }
}
