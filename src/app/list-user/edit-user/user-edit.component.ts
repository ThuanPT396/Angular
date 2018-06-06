import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../../model/user.model';
import { throwError } from 'rxjs';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../../model/BaseResponse.model';
import { IUser } from '../../interface/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  username = "";
  phoneNumber = "";
  isActive = 'true';
  role = '0';
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }
  onAddItem() {
    this.http
      .post<BaseResponse<IUser[]>>('http://27.74.245.84:8080/user/create',
        {
          username: this.username,
          phoneNumber: this.phoneNumber,
          role: 0
        })
      .subscribe((response) => {
        console.log(response);
        alert("Create Administrator is successfully.")
      },
        error => {
          console.error("Error saving user!");
          alert("Create Administrator is fail.")
          return throwError(error);  // Angular 6/RxJS 6
        }
      );
  }
  // onAddItem() {
  //   const ingUserName = this.userNameInputRef.nativeElement.value;
  //   const ingPhoneNumber = this.phoneNumberInputRef.nativeElement.value;

  //   const newUser = new User(ingUserName,"123456",ingPhoneNumber,this.role,this.isActive);
  //   this.UserAdded.emit(newUser);
  //   console.log("Add success");
  // }
}
