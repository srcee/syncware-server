import { Injectable } from '@nestjs/common';
import { User, UserRole } from '../../common/entities/user.entity';

@Injectable()
export class PermissionsService {
  isSameRestaurant(user: User, resourceRestaurantId: number): boolean {
    return user.restaurant.id === resourceRestaurantId;
  }

  isSameOrganization(user: User, orgId: number): boolean {
    return user.restaurant.organization.id === orgId;
  }

  canAccessUser(requestingUser: User, targetUser: User): boolean {
    if (requestingUser.role === UserRole.Admin) {
      return this.isSameOrganization(
        requestingUser,
        targetUser.restaurant.organization.id,
      );
    }

    return requestingUser.restaurant.id === targetUser.restaurant.id;
  }
}
