import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from '../../common/types/authenticated-request.interface';

interface GraphQLLoginBody {
  variables?: {
    input?: {
      username: string;
      password: string;
    };
  };
  [key: string]: unknown;
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: AuthenticatedRequest }>().req;

    const body = request.body as GraphQLLoginBody;

    const input = body.variables?.input;
    if (input) {
      body.username = input.username;
      body.password = input.password;
    }

    return request;
  }
}
