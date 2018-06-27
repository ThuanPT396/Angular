import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToasterService } from '../../service/toast/toaster.service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  username = ""
  fullName = ""
  currentpw = ""
  newpw = ""
  confirmpw = ""
  textValidPW="";
  textConfirmPW="";
  constructor(private router: Router, private userService: UserService, private toastService: ToasterService) { }

  ngOnInit() {
    var result = this.userService.getUserClaims();
    if (localStorage.getItem('role')!='1') {
      this.fullName = result.fullName
    }else{
      this.fullName = result.clinicName
    }
    this.username = result.username
  }
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    this.router.navigate(['/login'])
  }
  checkPassword(username:string, password:string){
      this.userService
      .userCheckPassword(username,password)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.textValidPW="Password is valid";
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
            this.toastService.Success("Change Password Administrator Successfully")
            this.logout();
          }
          else {
            this.toastService.Error("Password is invalid. Change Password Administrator Failure.")
            this.currentpw = ''
          }
        },
      );
    } else {
      this.toastService.Error("Confirm password not correct. Change Password Administrator Failure.")
      this.newpw = ''
      this.confirmpw = ''
    }
  }
}
