import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { License } from '../model/license.model';

@Injectable()
export class LicenseService {
    constructor(private http: HttpClient) { }
    url = 'http://27.74.245.84:8080';
    getLicenses() {
        return this
        .http
        .get<BaseResponse<License[]>>(`${this.url}/license/getAllLicense`);
    }
}