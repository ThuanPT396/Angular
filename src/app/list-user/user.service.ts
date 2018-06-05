import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    url = 'http://27.74.245.84:8080';
    getUsers() {
        return this
            .http
            .get<BaseResponse<User[]>>(`${this.url}/user/getAllAdmin`)
    }
}