import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { Observable } from 'rxjs';
import { Clinic } from '../model/clinic.model';

@Injectable()
export class ClinicService {
    constructor(private http: HttpClient) { }
    url = 'http://27.74.245.84:8080';
    getClinics() {
        return this
        .http
        .get<BaseResponse<Clinic[]>>(`${this.url}/clinic/getAllClinic`);
    }
}