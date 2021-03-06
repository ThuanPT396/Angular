import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { Admin } from '../model/user.model';
import { Final } from '../Const';
import { Clinic } from '../model/clinic.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;

    getUsers() {
        return this
            .http
            .get<BaseResponse<Admin[]>>(`${this.url}/user/getAllUser?role=0`);
    }

    postUser(username, fullName, phoneNumber,email, isActive) {
        return this
            .http
            .post<BaseResponse<Admin[]>>(`${this.url}/user/update`,
                {
                    username: username,
                   // password: password,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    role: 0,
                    email:email,
                    isActive: isActive
                })
    }

    postCreateUser(username, fullName, phoneNumber,email) {
        return this
            .http
            .post<BaseResponse<Admin[]>>(`${this.url}/user/create`,
                {
                    username: username,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    email: email,
                    role: 0
                })
    }

    userChangePassword(username,currentpw,newpw){
        return this
        .http
        .post<BaseResponse<Admin[]>>(`${this.url}/user/changePassword`,
        {
            username: username,
            password: currentpw,
            newPassword: newpw,
        })
    }

    userCheckPassword(username,password){
        return this
        .http
        .post<BaseResponse<Admin[]>>(`${this.url}/user/checkPassword`,
        {
            username: username,
            password: password
        })
    }
    userCheckUsername(username){
        return this.http.post(`${this.url}/user/checkDuplicate`,{
            username:username
        })
    }
    userCheckPhoneNumber(phoneNumber){
        return this.http.post(`${this.url}/user/checkDuplicate`,{
            phoneNumber:phoneNumber
        })
    }
    userCheckEmail(email){
        return this.http.post(`${this.url}/user/checkDuplicate`,{
            email:email
        })
    }
    userAuthentication(username, password) {
        return this.http.post(`${this.url}/user/login`, {
            username: username,
            password: password
        })
    }
    getUserClaims() {
        const username = localStorage.getItem('username');
        const fullName = localStorage.getItem('fullName');   
        const clinicName = localStorage.getItem('clinicName'); 
        const phoneNumber = localStorage.getItem('phoneNumber'); 
        const role = localStorage.getItem('role');   
        var result = new Clinic(username,"",fullName,phoneNumber, role, "","",clinicName,"","","","","");
        return result
    }

    postSendTokenToServer(token, topic){
        return this
        .http
        .post<BaseResponse<Admin[]>>(`${this.url}/clinic/subscribeTopic`,
        {
            token: token,
            topic: topic
        })
    }

    postUnsubscribe(token, topic){
        return this
        .http
        .post<BaseResponse<Admin[]>>(`${this.url}/clinic/unsubscribeTopic`,
        {
            token: token,
            topic: topic
        })
    }
}
