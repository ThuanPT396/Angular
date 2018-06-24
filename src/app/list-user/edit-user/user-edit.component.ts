import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToasterService } from '../../service/toast/toaster.service';
import { DialogService } from '../../service/dialog/dialog.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  username = "";
  textCheckUsername="";
  phoneNumber = "";
  fullName = "";
  email = "";
  isActive = 'true';
  role = '0';
  hasErrorUsername=false;
  hasErrorPhoneNumber=false;
  hasErrorEmail=false;
  hiddenicon = true;
  constructor(private userService: UserService, private toastService: ToasterService, private dialog: DialogService) { }

  ngOnInit() {

  }
  onAddItem() {
    this.userService
      .postCreateUser(this.username, this.fullName, this.phoneNumber, this.email)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Create Administrator Successfully")
          this.username = "";
          this.phoneNumber = "";
          this.fullName = "";
          this.email = "";
        }
        else {
          this.toastService.Error("Create Administrator Failure. Username is duplicate!!!")
        }
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        }
      );
  }
  checkUsername(username: string) {
    this.userService
      .userCheckUsername(username)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          if (this.username=='') {
            this.hasErrorUsername=true;
            return;
          }
          this.hasErrorUsername=false;
        }else{
          this.hasErrorUsername=true;
        }
      })
  }

  checkPhoneNumber(phoneNumber: string) {
    this.userService
      .userCheckPhoneNumber(phoneNumber)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          if (this.phoneNumber=='') {
            this.hasErrorPhoneNumber=true;
            return;
          }
          this.hasErrorPhoneNumber=false;
        }else{
          this.hasErrorPhoneNumber=true;
        }
      })
  }

  checkEmail(email: string) {
    this.userService
      .userCheckEmail(email)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          if (this.email=='') {
            this.hasErrorEmail=true;
            return;
          }
          this.hasErrorEmail=false;
        }else{
          this.hasErrorEmail=true;
        }
      })
  }

}
