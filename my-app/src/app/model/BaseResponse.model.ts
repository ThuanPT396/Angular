export class BaseResponse<T>{
    constructor(
      public status: string,
      public value: T,
      public error: number){}
  }