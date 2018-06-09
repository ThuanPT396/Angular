import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { User } from '../model/user.model';
import { Final } from '../Const';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
   // url = 'http://27.74.245.84:8080';
    url = `${Final.API_ENDPOINT}`;

    getUsers() {
        return this
        .http
        .get<BaseResponse<User[]>>(`${this.url}/user/getAllAdmin`);
    }

    postUser(username,password,fullName,phoneNumber,isActive){
        return this
        .http
        .post<BaseResponse<User[]>>(`${Final.API_ENDPOINT}/user/update`,
        {
          username: username ,
          password: password,
          fullName: fullName,
          phoneNumber: phoneNumber,
          role: 0,
          isActive: isActive
        })
    }

    postCreateUser(username,fullName,phoneNumber){
        return this
        .http
        .post<BaseResponse<User[]>>(`${Final.API_ENDPOINT}/user/create`,
        {
            username:username,
            fullName:fullName,
            phoneNumber:phoneNumber,
            role:0
        })
    }
    
}
