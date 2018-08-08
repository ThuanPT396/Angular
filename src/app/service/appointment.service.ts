import { Injectable } from "@angular/core";
import { Final } from "../Const";
import { HttpClient } from "@angular/common/http";
import { BaseResponse } from "../model/BaseResponse.model";
import { Appointment } from "../model/appointment.model";
import { PhoneNumber } from "../model/phoneNumber.model";
import { Patient } from "../model/patient.model";
import { AppointmentList } from "../model/appointmentList.model";
import { Observable } from "rxjs";

@Injectable()
export class AppointmentService {
    constructor(private http: HttpClient) { }
    url = `${Final.API_ENDPOINT}`;

    getAppointments(name: string, date: string) {
        if(date){
            return this
            .http
            .get<BaseResponse<AppointmentList>>(`${this.url}/appointment/getAppointmentsListByDateForWeb?clinicUsername=${name}&date=${date}`);
        }
        return this
            .http
            .get<BaseResponse<AppointmentList>>(`${this.url}/appointment/getAppointmentsListByDateForWeb?clinicUsername=${name}`);
    }

    postCheckStatus(clinicName,appointmentID,status){
        return this
            .http
            .post<BaseResponse<AppointmentList>>(`${this.url}/appointment/checkVisit`,{
                clinicUsername:clinicName,
                appointmentID:appointmentID,
                status:status
            });
    
    }
    postBlockNumber(clinicName,phoneNumber,isBlock){
        return this
        .http
        .post<BaseResponse<AppointmentList>>(`${this.url}/block/blockNumber`,{
            clinicUsername:clinicName,
            phoneNumber:phoneNumber,
            isBlock:isBlock
        });
    }

    getPhoneNumber(clinicName){
        // return this.http.get<BaseResponse<PhoneNumber[]>>(`${this.url}/block/getBlock?clinicUsername=${clinicName}`);
        return this
        .http
        .post<BaseResponse<AppointmentList>>(`${this.url}/clinic/getBookingHistory`,{
            username:clinicName
        });
    }


    postChartByDate(username,startDate,endDate){
        return this
        .http
        .post<BaseResponse<Appointment[]>>(`${this.url}/report/dateReport`,{
            username:username,
            startDate:startDate,
            endDate:endDate
        });
    }

    postChartByMonth(username,startDate,endDate){
        return this
        .http
        .post<BaseResponse<Appointment[]>>(`${this.url}/report/monthReport`,{
            username:username,
            startDate:startDate,
            endDate:endDate
        });
    }

    postChartByYear(username,startDate,endDate){
        return this
        .http
        .post<BaseResponse<Appointment[]>>(`${this.url}/report/yearReport`,{
            username:username,
            startDate:startDate,
            endDate:endDate
        });
    }

    postUpdatePatient(patientID,phoneNumber,secondPhoneNumber,fullName,address,yob,gender){
        return this
        .http
        .post<BaseResponse<Patient[]>>(`${this.url}/patient/update`,{
            patientID:patientID,
            phoneNumber:phoneNumber,
            secondPhoneNumber:secondPhoneNumber,
            fullName:fullName,
            address:address,
            yob:yob,
            gender:gender
        });
    }

    search(username: string, searchValue: string): Observable<BaseResponse<Patient[]>> {
        return this.http.post<BaseResponse<Patient[]>>(`${this.url}/patient/search`, {
            username: username,
            searchValue: searchValue
        })
      }

      postMergePatient(oldPatientID,newPatientID){
        return this
        .http
        .post<BaseResponse<Patient[]>>(`${this.url}/patient/merge`,{
            oldPatientID:oldPatientID,
            newPatientID:newPatientID,
        });
    }
}

