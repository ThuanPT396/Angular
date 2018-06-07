import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { BaseResponse } from '../model/BaseResponse.model';
import { Final } from '../Const';

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
  displayedColumns = ['position', 'username', 'fullname', 'phoneNumber', 'function'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService, private http: HttpClient) {

  }
  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.userService
      .getUsers()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var user = tmp.value[i];
          var result = new User(user.username, user.password, user.fullName, user.phoneNumber, user.role, user.isActive);
          console.log(result);
          this.ELEMENT_DATA.push(result);

        }
        this.dataSource.data = this.ELEMENT_DATA;
      })
  }

  onRemoveUser(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.http
      .post<BaseResponse<User[]>>(`${Final.API_ENDPOINT}/user/update`,
        {
          username: this.ELEMENT_DATA[index].username,
          password: this.ELEMENT_DATA[index].password,
          fullName: this.ELEMENT_DATA[index].fullName,
          phoneNumber: this.ELEMENT_DATA[index].phoneNumber,
          role: 0,
          isActive: this.ELEMENT_DATA[index].isActive = this.active + ""
        })
      .subscribe((response) => {
        console.log(response);
        alert("Remove Administrator is successfully.")

      },
        error => {
          console.error("Error delete user!");
          alert("Remove Administrator is fail.")
          return throwError(error);  // Angular 6/RxJS 6
        }
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
    this.http
      .post<BaseResponse<User[]>>(`${Final.API_ENDPOINT}/user/update`,
        {
          username: this.ELEMENT_DATA[index].username,
          password: this.ELEMENT_DATA[index].password,
          fullName: this.fullName,
          phoneNumber: this.phoneNumber,
          role: 0,
          isActive: 1
        })
      .subscribe((response) => {
        console.log(response);
        alert("Update Administrator is successfully.");

      },
        error => {
          console.error("Error Update user!");
          alert("Update Administrator is fail.");
          return throwError(error);  // Angular 6/RxJS 6
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