import { Component, OnInit, ViewChild } from '@angular/core';
import { Clinic } from '../../model/clinic.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ClinicService } from '../../service/clinic.service';
import { ToasterService } from '../../service/toast/toaster.service';
import { DialogService } from '../../service/dialog/dialog.service';

@Component({
  selector: 'app-list-clinic-for-staff',
  templateUrl: './list-clinic-for-staff.component.html',
  styleUrls: ['./list-clinic-for-staff.component.css'],
  providers: [ClinicService]
})
export class ListClinicForStaffComponent implements OnInit {
  ELEMENT_DATA: Clinic[] = [];
  userName = "";
  phoneNumber;
  accountSid="";
  authToken="";
  displayedColumns = ['position', 'username', 'address', 'clinicName', 'email', 'expiredLicense', 'function'];
  dataSource = new MatTableDataSource<Clinic>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private clinicService: ClinicService, private toastService: ToasterService, private dialog: DialogService) {
    this.clinicService
      .getClinicsForStaff()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var clinic = tmp.value[i];
          var result = new Clinic(clinic.username, clinic.password, clinic.fullName, clinic.phoneNumber, clinic.role, clinic.isActive, clinic.address, clinic.clinicName, clinic.email,"","","","");
          this.ELEMENT_DATA.push(result);
        }
        this.dataSource.filter = "";
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        }
      )
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onPushPopup(userName: string) {
    this.userName = userName;
}
  onUpdateClinic(username: string) {
    const index = this.ELEMENT_DATA.findIndex(clinic => clinic.username === username);
    this.ELEMENT_DATA[index].phoneNumber = this.phoneNumber;
    this.ELEMENT_DATA[index].accountSid = this.accountSid;
    this.ELEMENT_DATA[index].authToken = this.authToken;
    this.clinicService
      .postClinicForStaff(this.ELEMENT_DATA[index].username,
        this.ELEMENT_DATA[index].phoneNumber,
        this.ELEMENT_DATA[index].accountSid,
        this.ELEMENT_DATA[index].authToken)
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
