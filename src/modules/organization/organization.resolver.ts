import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

@Resolver('Organization')
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query(() => Organization, { name: 'organization' })
  async findOne(@Args('id') id: number) {
    return this.organizationService.findOne(id);
  }

  @Mutation(() => Organization)
  createOrganization(
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
  ) {
    return this.organizationService.create(createOrganizationInput);
  }

  @Mutation(() => Organization)
  updateOrganization(
    @Args('id') id: number,
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ) {
    return this.organizationService.update(id, updateOrganizationInput);
  }

  @Mutation(() => Boolean)
  async deleteOrganization(@Args('id') id: number) {
    return await this.organizationService.delete(id);
  }
}
