import { Component, OnInit } from '@angular/core';

import { User } from '../model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  // name = "";
  // password = "";
  // phoneNumber = 0;
  // role=0;
     avtived = "false";
  users: User[] = [
    new User('thuan@gmail.com','password',1234567893,'admin','true'),
    new User('kiet@gmail.com','passkiet',6376182736,'admin','false'),
    new User('phuong@gmail.com','passphuong',9898988923,'admin','true'),
    new User('duy@gmail.com','passduyd',4123213444,'admin','true'),
  ];

  constructor() { }

  ngOnInit() {
  }
  onUserAdded(user: User) {
  if(user.roleId ==='0') user.roleId='admin';
  this.users.push(user);
  }
  onUserDelete(userName: string){
  const index= this.users.findIndex(user =>user.userName === userName);
  this.users[index].isActive = this.avtived;
  this.users.splice(index,1);
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
}
