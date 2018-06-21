import { Component, OnInit, ViewChild } from '@angular/core';
import { DevService } from './dev.service';
import { User } from './dev.model';
import { PageEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';


@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css'],
  providers:[DevService]
})
export class DevComponent implements OnInit {
  ELEMENT_DATA: User[] = [];
  username = "";
  password= "123456"

  // MatPaginator Output
  pageEvent: PageEvent;
  selectedRowIndex;

  displayedColumns = ['position', 'username', 'fullname', 'phoneNumber', 'function'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private devService:DevService,private toastService: ToasterService,private dialog: DialogService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.devService
      .getUsers()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var user = tmp.value[i];
          // console.log(tmp.value);
          var result = new User(user.username,user.password, user.fullName, user.phoneNumber, user.role, user.isActive, user.email);
          this.ELEMENT_DATA.push(result);
        }
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error => {
        this.dialog.openDialog("Attention", "Network is Disconnect");
      })
  }
  onPushPopup(userName: string) {
    // const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.username = userName;
  }
  onChangPassword(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.devService
      .postUser(this.ELEMENT_DATA[index].username,
        this.password,
       )
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Change Password Administrator Successfully")
        }
        else {
          this.toastService.Error("Change Password Administrator Failure")
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
