import { Component, OnInit, Input } from '@angular/core';

import { User } from '../model/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  // name = "";
  // password = "";
  // phoneNumber = 0;
  // role=0;
  message: string;
  avtived = "false";
  users: User[];

  // users: User[] = [
  //   new User('thuan@gmail.com', 'password', 1234567893, 'admin', 'true'),
  //   new User('kiet@gmail.com', 'passkiet', 6376182736, 'admin', 'false'),
  //   new User('phuong@gmail.com', 'passphuong', 9898988923, 'admin', 'true'),
  //   new User('duy@gmail.com', 'passduyd', 4123213444, 'admin', 'true'),
  // ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe((response) => {
        this.users = response.value;
        console.log(this.users);
        // var tmp = JSON.parse(JSON.stringify(response));
        // this.users =[];
        // if (tmp.status == true) {
        //   // this.users = tmp.value;
        //   for (var i in tmp.value) {
        //     var user = tmp.value[i];
        //     var result = new User(user.username, "1234567", user.phoneNumber, user.role, user.isActive);
        //     this.users.push(result);
        //     console.log(user);
        //   }
        // } else {
        //   console.log(tmp.error);
        // }
      });
  }
}

  // onUserAdded($event) {
  //   this.users.push($event);
  // }
  // onUserDelete(userName: string) {
  //   const index = this.users.findIndex(user => user.userName === userName);
  //   this.users[index].isActive = this.avtived;
  //   this.users.splice(index, 1);
  // }
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

