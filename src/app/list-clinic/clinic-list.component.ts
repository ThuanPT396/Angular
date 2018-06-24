import { Component, OnInit, ViewChild } from '@angular/core';
import { Clinic } from '../model/clinic.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ClinicService } from '../service/clinic.service';
import { BaseResponse } from '../model/BaseResponse.model';
import { Final } from '../Const';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';

@Component({
    selector: 'app-clinic-list',
    templateUrl: './clinic-list.component.html',
    styleUrls: ['./clinic-list.component.css'],
    providers: [ClinicService]
})
export class ClinicListComponent implements OnInit {
    ELEMENT_DATA: Clinic[] = [];
    active = 0;
    userName = "";
    phoneNumber = 0;
    fullName = "";
    email = "";
    address = "";
    clinicName = "";
    examinationDuration = ""
    expiredLicense = ""
    accountSid = ""
    authToken = ""

    isStaff = false;
    displayedColumns = ['position', 'username', 'phoneNumber', 'address', 'clinicName', 'email', 'function'];
    dataSource = new MatTableDataSource<Clinic>(this.ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private clinicService: ClinicService, private toastService: ToasterService, private dialog: DialogService) {
        this.clinicService
            .getClinics()
            .subscribe((response) => {
                var tmp = JSON.parse(JSON.stringify(response));
                for (var i in tmp.value) {
                    var clinic = tmp.value[i];
                    var result = new Clinic(clinic.username, clinic.password, clinic.fullName, clinic.phoneNumber, clinic.role, clinic.isActive, clinic.address, clinic.clinicName, clinic.email, clinic.accountSid, clinic.authToken, clinic.examinationDuration, clinic.expiredLicense);
                    this.ELEMENT_DATA.push(result);
                    console.log(result)
                }
                this.dataSource.filter = "";
            },
                error => {
                    this.dialog.openDialog("Attention", "Cannot connect network!");
                }
            )
    }

    ngOnInit() {
        const role = localStorage.getItem('role');
        if (role == "2") {
            this.isStaff = true;
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    onRemoveClinic(userName: string) {
        const index = this.ELEMENT_DATA.findIndex(clinic => clinic.username === userName);
        this.clinicService
            .postClinic(this.ELEMENT_DATA[index].username,
                this.ELEMENT_DATA[index].fullName,
                this.ELEMENT_DATA[index].address,
                this.ELEMENT_DATA[index].clinicName,
                this.ELEMENT_DATA[index].phoneNumber,
                this.ELEMENT_DATA[index].email, 0,
                this.ELEMENT_DATA[index].accountSid,
                this.ELEMENT_DATA[index].authToken)
            .subscribe((response) => {
                var tmp = JSON.parse(JSON.stringify(response));
                if (tmp.status == true) {
                    this.toastService.Success("Remove Clinic Successfully")
                }
                else {
                    this.toastService.Error("Remove Clinic Failure")
                }
            },
                error => {
                    this.dialog.openDialog("Attention", "Cannot connect network!");
                }
            );
        this.ELEMENT_DATA.splice(index, 1);
        this.dataSource.filter = "";

    }
    onPushPopup(userName: string, phoneNumber: number, address: string, clinicName: string, email: string) {
        const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.fullName = this.ELEMENT_DATA[index].fullName;
        this.address = address;
        this.clinicName = clinicName;
        this.email = email;
        this.examinationDuration = this.ELEMENT_DATA[index].examinationDuration;
        this.expiredLicense = this.ELEMENT_DATA[index].expiredLicense;
        this.accountSid = this.ELEMENT_DATA[index].accountSid;
        this.authToken = this.ELEMENT_DATA[index].authToken;
    }
    onUpdateClinic(username: string) {
        const index = this.ELEMENT_DATA.findIndex(clinic => clinic.username === username);
        this.ELEMENT_DATA[index].phoneNumber = this.phoneNumber;
        this.ELEMENT_DATA[index].address = this.address;
        this.ELEMENT_DATA[index].clinicName = this.clinicName;
        this.ELEMENT_DATA[index].email = this.email;
        this.ELEMENT_DATA[index].fullName = this.fullName;
        this.ELEMENT_DATA[index].accountSid =this.accountSid;
        this.ELEMENT_DATA[index].authToken=this.authToken
        this.clinicService
            .postClinic(this.ELEMENT_DATA[index].username,
                this.ELEMENT_DATA[index].fullName,
                this.ELEMENT_DATA[index].address,
                this.ELEMENT_DATA[index].clinicName,
                this.ELEMENT_DATA[index].phoneNumber,
                this.ELEMENT_DATA[index].email, 1,
                this.ELEMENT_DATA[index].accountSid,
                this.ELEMENT_DATA[index].authToken)
            .subscribe((response) => {
                var tmp = JSON.parse(JSON.stringify(response));
                if (tmp.status == true) {
                    this.toastService.Success("Update Clinic Successfully")
                }
                else {
                    this.toastService.Error("Update Clinic Failure")
                    console.log(tmp.error)
                }
            },
                error => {
                    this.dialog.openDialog("Attention", "Cannot connect network!");
                }
            );
        this.dataSource.filter = "";
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
