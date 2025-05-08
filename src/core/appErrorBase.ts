export class AppErrorBase extends Error {
  public status?: number;

  constructor(
    public message: string,
    public details?: unknown,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppErrorBase.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  public static createErrorConstructor<T extends object>(
    name: string,
    message: string,
    status?: number,
  ): ErrorBaseConstructor<T> {
    class CustomError extends AppErrorBase {
      constructor(public details?: T) {
        super(message, details);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.name = name;
        if (status) {
          this.status = status;
        }
      }
    }

    return CustomError as ErrorBaseConstructor<T>;
  }
}

export type ErrorBaseConstructor<T extends object> = new (
  details?: T,
) => AppErrorBase & { details: T };
