import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Final } from "../Const";
import { BaseResponse } from "../model/BaseResponse.model";
import { Staff } from "../model/staff.model";

@Injectable({
    providedIn: 'root'
})
export class StaffService {
    constructor(private http: HttpClient) { }
    // url = 'http://27.74.245.84:8080';
    url = `${Final.API_ENDPOINT}`;

    getStaffs() {
        return this
            .http
            .get<BaseResponse<Staff[]>>(`${this.url}/user/getAllUser?role=2`);
    }

    postStaff(username, fullName, phoneNumber,email, isActive) {
        return this
            .http
            .post<BaseResponse<Staff[]>>(`${this.url}/user/update`,
                {
                    username: username,
                   // password: password,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    role: 2,
                    email:email,
                    isActive: isActive
                })
    }

    postCreateStaff(username, fullName, phoneNumber,email) {
        return this
            .http
            .post<BaseResponse<Staff[]>>(`${this.url}/user/create`,
                {
                    username: username,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    email: email,
                    role: 2
                })
    }

  
    staffCheckUsername(username){
        return this.http.post(`${this.url}/user/checkDuplicate`,{
            username:username
        })
    }
    staffCheckPhoneNumber(phoneNumber){
        return this.http.post(`${this.url}/user/checkDuplicate`,{
            phoneNumber:phoneNumber
        })
    }
    staffCheckEmail(email){
        return this.http.post(`${this.url}/user/checkDuplicate`,{
            email:email
        })
    }
    staffAuthentication(username, password) {
        return this.http.post(`${this.url}/user/login`, {
            username: username,
            password: password
        })
    }
    getstaffClaims() {
        const username = localStorage.getItem('username');
        const fullName = localStorage.getItem('fullName');    
        const role = localStorage.getItem('role');   
        var result = new Staff(username,fullName, 0, role, "","")
        return result
    }
}
