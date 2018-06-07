import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { Observable } from 'rxjs';
import { Clinic } from '../model/clinic.model';
import { Final } from '../Const';

@Injectable()
export class ClinicService {
    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;
    getClinics() {
        return this
        .http
        .get<BaseResponse<Clinic[]>>(`${this.url}/clinic/getAllClinic`);
    }
}