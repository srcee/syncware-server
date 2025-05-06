import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { LoginResponse } from './dto/login.response';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.interface';

export interface GqlContext {
  req: AuthenticatedRequest;
}

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation('login')
  login(@Context() context: GqlContext): LoginResponse {
    return this.authService.login(context.req.user);
  }
}
