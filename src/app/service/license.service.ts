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

    postLicense(licenseID,price,duration,name,description,isActive){
        return this
        .http
        .post<BaseResponse<License[]>>(`${this.url}/license/update`,{
            licenseID:licenseID,
            price:price,
            duration:duration,
            name:name,
            description:description,
            isActive:isActive
        })
    }

    postCreateLicense(price,duration,name,description,isActive){
        return this
        .http
        .post<BaseResponse<License[]>>(`${this.url}/license/create`,{
            price:price,
            duration:duration,
            name:name,
            description:description,
            isActive: isActive
        })
    }
}