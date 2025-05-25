import { Request } from 'express';
import { User } from '../../common/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
