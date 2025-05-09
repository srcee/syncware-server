import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async findOne(id: number): Promise<Organization | null> {
    return this.organizationRepository.findOne({ where: { id } });
  }

  async create(input: CreateOrganizationInput): Promise<Organization> {
    const organization = this.organizationRepository.create(input);

    return await this.organizationRepository.save(organization);
  }

  async update(
    id: number,
    input: UpdateOrganizationInput,
  ): Promise<Organization | null> {
    const organization = await this.findOne(id);

    if (!organization) {
      return null;
    }

    Object.assign(organization, input);

    return await this.organizationRepository.save(organization);
  }

  async delete(id: number): Promise<boolean> {
    const organization = await this.findOne(id);

    if (!organization) {
      throw new Error('Organization does not exist');
    }

    Object.assign(organization, { archived: false });

    await this.organizationRepository.save(organization);

    return true;
  }
}
