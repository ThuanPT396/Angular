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
    address = "";
    clinicName = "";
    email="";
    displayedColumns = ['position', 'username', 'phoneNumber', 'address', 'clinicName','email', 'function'];
    dataSource = new MatTableDataSource<Clinic>(this.ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private clinicService: ClinicService, private http: HttpClient, private toastService: ToasterService,private dialog: DialogService) {
        this.clinicService
            .getClinics()
            .subscribe((response) => {
                var tmp = JSON.parse(JSON.stringify(response));
                for (var i in tmp.value) {
                    var clinic = tmp.value[i];
                    var result = new Clinic(clinic.username, clinic.password, clinic.fullName, clinic.phoneNumber, clinic.role, clinic.isActive, clinic.address, clinic.clinicName,clinic.email);
                    this.ELEMENT_DATA.push(result);
                }
                this.dataSource.filter = "";
            },
            error => {
                this.dialog.openDialog("Attention", "Network is Disconnect");
              }
        )
    }

    ngOnInit() {
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
                0,this.ELEMENT_DATA[index].email)
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
                this.dialog.openDialog("Attention", "Network is Disconnect");
              }
        );
        this.ELEMENT_DATA.splice(index, 1);
        this.dataSource.filter = "";

    }
    onPushPopup(userName: string, phoneNumber: number, address: string, clinicName: string,email:string) {
        const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.clinicName = clinicName;
        this.email=email;
    }
    onUpdateClinic(username: string) {
        const index = this.ELEMENT_DATA.findIndex(clinic => clinic.username === username);
        this.ELEMENT_DATA[index].phoneNumber = this.phoneNumber;
        this.ELEMENT_DATA[index].address = this.address;
        this.ELEMENT_DATA[index].clinicName = this.clinicName;
        this.ELEMENT_DATA[index].email = this.email;
        this.clinicService
            .postClinic(this.ELEMENT_DATA[index].username,
                this.ELEMENT_DATA[index].fullName,
                this.ELEMENT_DATA[index].address,
                this.ELEMENT_DATA[index].clinicName,
                this.ELEMENT_DATA[index].phoneNumber,
                this.ELEMENT_DATA[index].email, 1)
            .subscribe((response) => {
                var tmp = JSON.parse(JSON.stringify(response));
                if (tmp.status == true) {
                    this.toastService.Success("Update Clinic Successfully")
                }
                else {
                    this.toastService.Error("Update Clinic Failure")
                }
            },
            error => {
                this.dialog.openDialog("Attention", "Network is Disconnect");
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
