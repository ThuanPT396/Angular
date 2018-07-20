import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToasterService } from '../../service/toast/toaster.service';
import { MyNotification } from '../../model/notification.model';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  username = ""
  fullName = ""
  phoneNumber=""
  hidden=false;
  currentpw = ""
  newpw = ""
  confirmpw = ""
  textValidPW="";
  textConfirmPW="";
  notifications: MyNotification[] = [];
  constructor(private router: Router, private userService: UserService, private toastService: ToasterService) { }
  
  updateNotification(notis: MyNotification[]){
    this.notifications.pop();
    for(var index in notis){
      var item = notis[index];
      this.notifications.push(item);
      console.log(item);
    }    
  }
  ngOnInit() {
    var result = this.userService.getUserClaims();
    if (localStorage.getItem('role')!='1') {
      this.fullName = result.fullName
      this.hidden=true;
    }else{
      this.fullName = result.clinicName
      this.hidden=false;
    }
    this.username = result.username
    this.phoneNumber=result.phoneNumber
  }
  logout() {
    this.userService.postUnsubscribe(localStorage.getItem('firebaseToken'),localStorage.getItem('username'))
    .subscribe(res => {
      console.log(res)
    })
    localStorage.removeItem('clinicName');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    localStorage.removeItem('firebaseToken')
    
  }
  checkPassword(username:string, password:string){
      this.userService
      .userCheckPassword(username,password)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.textValidPW="";
        }else{
          this.textValidPW="Password is invalid";
        }
      })
  }
  ConfirmPW(newpw,confirmpw){
    if (newpw!=confirmpw) {
      this.textConfirmPW="Confirm Password isn't correct";
    }else{
      this.textConfirmPW=""
    }
  }
  onChangePassword(username: string, password: string, newPassword: string) {
    if (this.newpw === this.confirmpw) {
      this.userService
        .userChangePassword(username, password, newPassword)
        .subscribe((response) => {
          var tmp = JSON.parse(JSON.stringify(response));
          if (tmp.status == true) {
            this.toastService.Success("Change Password Successfully")
            this.logout();
          }
          else {
            this.toastService.Error("Password is invalid. Change Password Failure.")
            this.currentpw = ''
          }
        },
      );
    } else {
      this.toastService.Error("Confirm password not correct. Change Password Failure.")
      this.newpw = ''
      this.confirmpw = ''
    }
  }
}
