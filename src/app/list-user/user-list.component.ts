import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  ELEMENT_DATA: User[] = [];
  active = 0;
  displayedColumns = ['position', 'username', 'password', 'phoneNumber', 'role', 'isActive', 'function'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService) {

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
          var result = new User(user.username, user.password, user.phoneNumber, user.role, user.isActive);
          // console.log(result);
          this.ELEMENT_DATA.push(result);

        }
        this.dataSource.data = this.ELEMENT_DATA;
      })
  }

  onRemoveUser(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
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