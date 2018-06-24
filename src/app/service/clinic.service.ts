import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { Clinic } from '../model/clinic.model';
import { Final } from '../Const';

@Injectable()
export class ClinicService {
    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;
    getClinics() {
        return this
            .http
            .get<BaseResponse<Clinic[]>>(`${this.url}/user/getAllUser?role=1`);
    }
    getClinicsForStaff() {
        return this
            .http
            .get<BaseResponse<Clinic[]>>(`${this.url}/clinic/getClinicsWaitingForPhone`);
    }

    postClinic(username, fullName, address, clinicName, phoneNumber, email, isActive,role,accountSid,authToken) {
        return this
            .http.post<BaseResponse<Clinic[]>>(`${this.url}/user/update`, {
                username: username,
                fullName: fullName,
                address: address,
                clinicName: clinicName,
                phoneNumber: phoneNumber,
                email: email,
                isActive: isActive,
                role:role,
                accountSid: accountSid,
                authToken:authToken
            })
    }

    postClinicForStaff(username, phoneNumber, accountSid, authToken) {
        return this
            .http.post<BaseResponse<Clinic[]>>(`${this.url}/clinic/registerPhoneNumber`, {
                username: username,
                phoneNumber: phoneNumber,
                accountSid: accountSid,
                authToken: authToken
            })
    }

    postResetClinic(username){
        return this
        .http.post<BaseResponse<Clinic[]>>(`${this.url}/clinic/removeTwilioAccount`, {
            username: username
        })
    }
}