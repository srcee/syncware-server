import { Request } from 'express';
import { User } from 'src/common/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
