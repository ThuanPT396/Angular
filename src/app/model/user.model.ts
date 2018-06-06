import { IUser } from "../interface/user.interface";

export class User implements IUser{
    constructor(
      public username: string,
      public password:string,
      public phoneNumber: number,
      public role: string,
      public isActive: string) {}
  }