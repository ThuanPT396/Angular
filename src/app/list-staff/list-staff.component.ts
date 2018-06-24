import { Component, OnInit, ViewChild } from '@angular/core';
import { Staff } from '../model/staff.model';
import { PageEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';
import { StaffService } from '../service/staff.service';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit {
  ELEMENT_DATA: Staff[] = [];
  username = "";
  fullName = "";
  phoneNumber = 0;
  active = 0;
  email = "";
  // MatPaginator Output
  pageEvent: PageEvent;
  selectedRowIndex;

  displayedColumns = ['position', 'username', 'fullname', 'phoneNumber', 'email', 'function'];
  dataSource = new MatTableDataSource<Staff>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private staffService: StaffService, private toastService: ToasterService, private dialog: DialogService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.staffService
      .getStaffs()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var user = tmp.value[i];
          // console.log(tmp.value);
          var result = new Staff(user.username, user.fullName, user.phoneNumber, user.role, user.isActive, user.email);
          this.ELEMENT_DATA.push(result);
        }
        this.dataSource.data = this.ELEMENT_DATA;
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        })
  }
  onRemoveStaff(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
      this.staffService
        .postStaff(this.ELEMENT_DATA[index].username,
          this.ELEMENT_DATA[index].fullName,
          this.ELEMENT_DATA[index].phoneNumber,
          this.ELEMENT_DATA[index].email,
          0)
        .subscribe((response) => {
          var tmp = JSON.parse(JSON.stringify(response));
          if (tmp.status == true) {
            this.toastService.Success("Remove Staff Successfully")
          }
          else {
            this.toastService.Error("Remove Staff Failure")
            console.log(tmp.error)
          }
        },
          error => {
            this.dialog.openDialog("Attention", "Cannot connect network!");
          }
        );
      this.ELEMENT_DATA.splice(index, 1);
      this.dataSource.filter = "";

  }
  onPushPopup(userName: string, fullName: string, phoneNumber: number, email: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.username = userName;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
  onUpdateStaff(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.ELEMENT_DATA[index].phoneNumber = this.phoneNumber;
    this.ELEMENT_DATA[index].fullName = this.fullName;
    this.ELEMENT_DATA[index].email = this.email;
    this.staffService
      .postStaff(this.ELEMENT_DATA[index].username,
        // this.ELEMENT_DATA[index].password,
        this.fullName,
        this.phoneNumber,
        this.email,
        1)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Update Staff Successfully")
        }
        else {
          this.toastService.Error("Update Staff Failure")
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
