import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { RequestContext } from '../context/request-context.service';
import { GqlContext } from 'src/modules/auth/auth.resolver';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext<GqlContext>().req;

    return RequestContext.run(req.user, () => next.handle());
  }
}
