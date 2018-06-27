import { Injectable } from "@angular/core";
import { Final } from "../Const";
import { HttpClient } from "@angular/common/http";
import { BaseResponse } from "../model/BaseResponse.model";
import { Appointment } from "../model/appointment.model";

@Injectable()
export class AppointmentService {
    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;

    getAppointments(name: string, date: string) {
        return this
            .http
            .get<BaseResponse<Appointment[]>>(`${this.url}/appointment/getAppointmentsListByDate?clinicUsername=${name}&date=${date}`);
    }

    postCheckStatus(clinicName,appointmentID,status){
        return this
            .http
            .post<BaseResponse<Appointment[]>>(`${this.url}/appointment/checkVisit`,{
                clinicUsername:clinicName,
                appointmentID:appointmentID,
                status:status
            });
    
    }
}
