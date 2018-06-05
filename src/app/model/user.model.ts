import { IUser } from "../interface/user.interface";

export class User implements IUser{
    constructor(
      public userName: string,
      public password:string,
      public phoneNumber: number,
      public roleId: string,
      public isActive: string) {}
  }

 

 