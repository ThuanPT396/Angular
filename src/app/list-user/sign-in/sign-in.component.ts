import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { DialogService } from '../../service/dialog/dialog.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLogin = true;
  constructor(private userService: UserService, private router: Router, private dialog: DialogService) { }

  ngOnInit() {

  }
  OnSubmit(username, password) {
    this.isLogin = false
    this.userService
      .userAuthentication(username, password)
      .subscribe(response => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          localStorage.setItem('username', tmp.value.username);
          localStorage.setItem('fullName', tmp.value.fullName);
          localStorage.setItem('clinicName', tmp.value.clinicName);
          localStorage.setItem('role', tmp.value.role);
          var role = localStorage.getItem('role');
          if (role == '0') {
            this.router.navigate(['/homeadmin'])
          } else if (role == '1') {
            this.router.navigate(['/homeclinic'])
          } else if (role == '2') {
            this.router.navigate(['/homestaff'])
          }

        } else {
          this.dialog.openDialog("Chú ý", "Tên đăng nhập hoặc mật khẩu không chính xác");
        }
      },
      error => {
        
      }
    )
    setTimeout(() => {
      this.dialog.openDialog("Chú ý", "Không thể kết nối với máy chủ");
      this.isLogin=true;
    }, 3000);
  }
}
