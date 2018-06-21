import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { Admin } from '../model/user.model';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  ELEMENT_DATA: Admin[] = [];
  username = "";
  fullName = "";
  phoneNumber = 0;
  active = 0;
  email = "";
  // MatPaginator Output
  pageEvent: PageEvent;
  selectedRowIndex;

  displayedColumns = ['position', 'username', 'fullname', 'phoneNumber', 'email', 'function'];
  dataSource = new MatTableDataSource<Admin>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService, private http: HttpClient, private toastService: ToasterService,private dialog: DialogService) {

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
          // console.log(tmp.value);
          var result = new Admin(user.username, user.fullName, user.phoneNumber, user.role, user.isActive, user.email);
          this.ELEMENT_DATA.push(result);
        }
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error => {
        this.dialog.openDialog("Attention", "Network is Disconnect");
      })
  }

  onRemoveUser(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.userService
      .postUser(this.ELEMENT_DATA[index].username,
        // this.ELEMENT_DATA[index].password,
        this.ELEMENT_DATA[index].fullName,
        this.ELEMENT_DATA[index].phoneNumber,
        this.ELEMENT_DATA[index].email,
        0)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Remove Administrator Successfully")
        }
        else {
          this.toastService.Error("Remove Administrator Failure")
          console.log(tmp.error)
        }
      },
      error => {
        this.dialog.openDialog("Attention", "Network is Disconnect");
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
  onUpdateUser(userName: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.username === userName);
    this.ELEMENT_DATA[index].phoneNumber = this.phoneNumber;
    this.ELEMENT_DATA[index].fullName = this.fullName;
    this.ELEMENT_DATA[index].email = this.email;
    this.userService
      .postUser(this.ELEMENT_DATA[index].username,
        // this.ELEMENT_DATA[index].password,
        this.fullName,
        this.phoneNumber,
        this.email,
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