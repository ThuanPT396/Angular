import { Component, OnInit } from '@angular/core';
import { Clinic } from '../model/clinic.model';

@Component({
    selector: 'app-clinic-list',
    templateUrl: './clinic-list.component.html',
    styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {
    // name = "";
    // password = "";
    // phoneNumber = 0;
    // role=0;
    avtived = "false";
    clinics: Clinic[] = [
        new Clinic('dakhaHN@gmail.com', 'password', 'phong kham da khoa HN', '144 Toki', 1234567893, '2AM', '9PM', 'admin', 'true'),
        new Clinic('nhanhau@gmail.com', 'passkiet', 'Nhan Hau', '27 Ham Tu', 6387126378, '5AM', '7PM', 'Clinic', 'false'),
        new Clinic('dakhaHCM@gmail.com', 'password', 'phong kham da khoa HCM', '144 Quang Trung', 1234567893, '2AM', '9PM', 'admin', 'true'),
        new Clinic('nhanhau2@gmail.com', 'passkiet', 'Nhan Hau 2', '27 Nguyen Van Quá', 6387126378, '5AM', '7PM', 'Clinic', 'false'),
    ];

    constructor() { }

    ngOnInit() {
    }
    onClinicAdded(clinic: Clinic) {
        if (clinic.roleId === '1') clinic.roleId = 'Clinic';
        this.clinics.push(clinic);
    }
    onClinicDelete(clinicName: string) {
        const index = this.clinics.findIndex(clinic => clinic.clinicName === clinicName);
        this.clinics[index].isActive = this.avtived;
        this.clinics.splice(index, 1);
    }
    // onUserPopup(userName: string, phoneNumber:number){
    //  const index= this.patients.findIndex(patient =>patient.name === name);
    //  this.name = name;
    //  this.phoneNumber = phoneNumber;
    // }
    // onSubmitUpdate(id:number){
    //    const index= this.patients.findIndex(patient =>patient.id === id);
    //    this.patients[index].name=this.name;
    //    this.patients[index].phoneNumber=this.phoneNumber;
    // }
}
