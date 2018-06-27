import { Injectable } from "@angular/core";

import { Final } from "../Const";
import { HttpClient } from "@angular/common/http";
import { BaseResponse } from "../model/BaseResponse.model";
import { Twilio } from "../model/twilio.model";

@Injectable({
    providedIn: 'root'
})
export class TwilioService {

    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;

    getTwilio(){
        return this
        .http
        .get<BaseResponse<Twilio[]>>(`${this.url}/account/getTwilios`);
    }
    postCreateTwilio(phoneNumber,accountSid,authToken){
        return this
        .http
        .post<BaseResponse<Twilio[]>>(`${this.url}/account/createNewTwilio`,{
            phoneNumber:phoneNumber,
            accountSid:accountSid,
            authToken:authToken
        })
    }
}