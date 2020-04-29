// see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

export class DomainError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = DomainError.name;
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = BadRequestError.name;
  }
}

export class UnAuthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = UnAuthorizedError.name;
  }
}
