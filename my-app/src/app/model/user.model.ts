export class User {
    constructor(
      public userName: string,
      public password:string,
      public phoneNumber: number,
      public roleId: string,
      public isActive: string) {}
  }