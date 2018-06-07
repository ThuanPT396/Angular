import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { License } from '../model/license.model';
import { Final } from '../Const';

@Injectable()
export class LicenseService {
    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;
    getLicenses() {
        return this
        .http
        .get<BaseResponse<License[]>>(`${this.url}/license/getAllLicense`);
    }
}