import { UnauthorizedError } from '~/application/errors/unauthorized-error';
import { Middleware } from '~/application/ports/middlewares/middleware';
import { RequestModel } from '~/application/ports/requests/request-model';
import { JwtTokenAdapter } from '~/common/adapters/security/jwt-token-adapter';

export class MiddlewareIsAuthenticated implements Middleware {
  constructor(private readonly jwtTokenAdapter: JwtTokenAdapter) {}

  async execute(request: RequestModel): Promise<void> | never {
    if (!request || !request.headers || !request.headers.authorization) {
      throw new UnauthorizedError('Invalid request');
    }

    const { authorization } = request.headers;
    const [, token] = authorization.split(/\s+/);

    try {
      this.jwtTokenAdapter.verify(token);
    } catch (error) {
      const unauthorizedError = new UnauthorizedError(error.message);
      unauthorizedError.stack = error.stack;
      throw unauthorizedError;
    }
  }
}
