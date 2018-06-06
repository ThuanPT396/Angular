import { Component, OnInit, ViewChild } from '@angular/core';
import { Clinic } from '../model/clinic.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ClinicService } from './clinic.service';

@Component({
    selector: 'app-clinic-list',
    templateUrl: './clinic-list.component.html',
    styleUrls: ['./clinic-list.component.css'],
    providers: [ClinicService]
})
export class ClinicListComponent implements OnInit {
    ELEMENT_DATA: Clinic[] = [];
    active = 0;
    displayedColumns = ['position', 'username', 'phoneNumber', 'role', 'isActive','address','clinicName','function'];
    dataSource = new MatTableDataSource<Clinic>(this.ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private clinicService: ClinicService) {
        this.clinicService
      .getClinics()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        console.log(tmp);
        for (var i in tmp.value) {
          var clinic = tmp.value[i];
          var result = new Clinic(clinic.username,clinic.password,clinic.phoneNumber,clinic.role,clinic.isActive,clinic.address,clinic.clinicName);
          console.log(result);
          this.ELEMENT_DATA.push(result);
          
        }
        this.dataSource.filter = "";
      })
     }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    onRemoveClinic(userName: string) {
        const index = this.ELEMENT_DATA.findIndex(clinic => clinic.username === userName);
        this.ELEMENT_DATA[index].isActive = this.active + "";
        //ELEMENT_DATA.splice(index, 1);

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
