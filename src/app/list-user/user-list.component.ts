import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { IUser } from '../interface/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  active = 0;
  displayedColumns = ['position','username', 'password', 'phoneNumber','role', 'isActive', 'function'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService) {
    this.userService
      .getUsers()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        console.log(tmp);
        for (var i in tmp.value) {
          var user = tmp.value[i];
          var result = new User(user.username, user.password, user.phoneNumber, user.role, user.isActive);
          console.log(result);
          ELEMENT_DATA.push(result);
          
        }
        this.dataSource.filter = "";
        console.log("Load11");
      })
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  onRemoveUser(userName: string) {
    const index = ELEMENT_DATA.findIndex(user => user.username === userName);
    ELEMENT_DATA[index].isActive = this.active + "";
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
const ELEMENT_DATA: User[] = [
  // {username: 'thuan', password: 'Hydrogen', phoneNumber: 12137287, role: '0', isActive: '1'},
];