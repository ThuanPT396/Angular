import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { User } from '../dev/dev.model';
import { Final } from '../Const';

@Injectable({
    providedIn: 'root'
})
export class DevService {
    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;

    getUsers() {
        return this
            .http
            .get<BaseResponse<User[]>>(`${this.url}/user/dev/getAllUser`);
    }

    postUser(username,password) {
        return this
            .http
            .post<BaseResponse<User[]>>(`${this.url}/user/dev/changePassword`,
                {
                    username: username,
                    password: password,
                })
    }

    getDeleteUser(username){
        return this
        .http
        .get<BaseResponse<User[]>>(`${this.url}/user/delete?username=${username}`);
    }
}
