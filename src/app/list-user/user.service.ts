import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { IUser } from '../interface/user.interface';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    url = 'http://27.74.245.84:8080';
    getUsers():Observable<IUser[]> {
        return this
        .http
        .get<IUser[]>(`${this.url}/user/getAllAdmin`);
    }
}