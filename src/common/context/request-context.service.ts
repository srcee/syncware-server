import { AsyncLocalStorage } from 'async_hooks';
import { User } from '../entities/user.entity';

type Store = { user: User };

const asyncLocalStorage = new AsyncLocalStorage<Store>();

export class RequestContext {
  static run<T>(user: User, fn: () => T): T {
    return asyncLocalStorage.run({ user }, fn);
  }

  static getUser(): User | undefined {
    return asyncLocalStorage.getStore()?.user;
  }
}
