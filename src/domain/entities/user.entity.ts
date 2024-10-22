import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public img?: string,
    public city?: string,
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const {
      id,
      _id,
      firstName,
      lastName,
      email,
      emailValidated,
      password,
      role,
      img,
      city,
    } = object;

    if (!_id && !id) throw CustomError.badRequest("Missing id");
    if (!firstName) throw CustomError.badRequest("Missing first name");
    if (!lastName) throw CustomError.badRequest("Missing last name");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!role) throw CustomError.badRequest("Missing role");

    return new UserEntity(
      _id || id,
      firstName,
      lastName,
      email,
      emailValidated,
      password,
      role,
      img,
      city,
    );
  }
}
