import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { BaseResponse } from '../model/BaseResponse.model';
import { Final } from '../Const';
import { ToasterService } from '../service/toast/toaster.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  ELEMENT_DATA: User[] = [];
  username = "";
  fullName = "";
  phoneNumber = 0;
  active = 0;
  // MatPaginator Output
  pageEvent: PageEvent;

  displayedColumns = ['position', 'username', 'fullname', 'phoneNumber', 'function'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService, private http: HttpClient, private toastService: ToasterService) {

  }
  ngOnInit() {
    // this.paginator.pageIndex = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.userService
      .getUsers()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var user = tmp.value[i];
          var result = new User(user.username, user.password, user.fullName, user.phoneNumber, user.role, user.isActive);
          this.ELEMENT_DATA.push(result);
        }
        this.dataSource.data = this.ELEMENT_DATA;
      })
  }

  onRemoveUser(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.userService
      .postUser(this.ELEMENT_DATA[index].username,
        this.ELEMENT_DATA[index].password,
        this.ELEMENT_DATA[index].fullName,
        this.ELEMENT_DATA[index].phoneNumber,
        0)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Remove Administrator Successfully")
        }
        else {
          this.toastService.Error("Remove Administrator Failure")
        }
      },
    );
    this.ELEMENT_DATA.splice(index, 1);
    this.dataSource.filter = "";
  }
  onPushPopup(userName: string, fullName: string, phoneNumber: number) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.username = userName;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
  }
  onUpdateUser(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.ELEMENT_DATA[index].phoneNumber = this.phoneNumber;
    this.ELEMENT_DATA[index].fullName = this.fullName;
    this.userService
      .postUser(this.ELEMENT_DATA[index].username,
        this.ELEMENT_DATA[index].password,
        this.fullName,
        this.phoneNumber,
        1)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Update Administrator Successfully")
        }
        else {
          this.toastService.Error("Update Administrator Failure")
        }
      },
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