import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../../model/user.model';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../../model/BaseResponse.model';
import { Final } from '../../Const';
import { ToasterService } from '../../service/toast/toaster.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  username = "";
  phoneNumber = "";
  fullName = "";
  email="";
  isActive = 'true';
  role = '0';
  constructor(private userService: UserService, private toastService:ToasterService) { }

  ngOnInit() {

  }
  onAddItem() {
    this.userService
      .postCreateUser(this.username, this.fullName, this.phoneNumber,this.email )
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Create Administrator Successfully")
        }
        else {
          this.toastService.Error("Create Administrator Failure. Username is duplicate!!!")
        }
      },
    );
  }
}
