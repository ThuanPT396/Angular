import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { DialogService } from '../../service/dialog/dialog.service';
import { NgxFormConfig } from '@ngx-plus/ngx-forms'
import { NgxAlertsService } from '@ngx-plus/ngx-alerts'
import { DatePipe } from '@angular/common';
import { parseDate } from 'ngx-bootstrap/chronos';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public item: any = {
    title: 'Alert Title',
    text: 'Alert Message',
  }
  public buttons: any[] = [
    {
      label: 'Success',
      classNames: 'btn btn-block btn-success',
      type: 'success',
    },
    {
      label: 'Error',
      classNames: 'btn btn-block btn-danger',
      type: 'error',
    },
    {
      label: 'Warning',
      classNames: 'btn btn-block btn-warning',
      type: 'warning',
    },
    {
      label: 'Info',
      classNames: 'btn btn-block btn-info',
      type: 'info',
    },
    {
      label: 'Question',
      classNames: 'btn btn-block btn-primary',
      type: 'question',
    },
  ]

  // ---------------------------------
  isLogin = true;
  date = new Date();

  constructor(private alerts: NgxAlertsService, private userService: UserService, private router: Router,
    //  private dialog: DialogService
  ) { }

  ngOnInit() {

  }
  handleAction(event) {
    switch (event.type) {
      case 'success':
        return this.alerts.alertSuccess(event.payload)
      case 'error':
        return this.alerts.alertError(event.payload)
      case 'warning':
        return this.alerts.alertWarning(event.payload)
      case 'info':
        return this.alerts.alertInfo(event.payload)
      case 'question':
        return this.alerts.alertQuestion(event.payload)
      default: {
        return console.log('$event', event)
      }
    }
  }
  OnSubmit(username, password) {
    this.isLogin = false
    this.userService
      .userAuthentication(username, password)
      .subscribe(response => {

        var tmp = JSON.parse(JSON.stringify(response));

        if (tmp.status == true) {
          var currentDate = parseDate(tmp.value.expiredLicense);
          var expiredDate = parseDate(tmp.value.currentTime);
          if (tmp.value.isActive == 0){
            this.alerts.alertError({
              type: 'error', payload: {
                title: 'Thông báo',
                text: 'Vui lòng xác nhận email của bạn',
              }
            }.payload)

            this.isLogin = true;
          } else if (currentDate >= expiredDate) {
            localStorage.setItem('username', tmp.value.username);
            localStorage.setItem('fullName', tmp.value.fullName);
            localStorage.setItem('clinicName', tmp.value.clinicName);
            localStorage.setItem('phoneNumber', tmp.value.phoneNumber);
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
            this.alerts.alertError({
              type: 'error', payload: {
                title: 'Thông báo',
                text: 'Vui lòng gia hạn tài khoản để tiếp tục sử dụng hệ thống',
              }
            }.payload)

            this.isLogin = true;
          }
        } else {
          this.alerts.alertError({
            type: 'error', payload: {
              title: 'Thông báo',
              text: 'Tên đăng nhập hoặc mật khẩu không chính xác',
            }
          }.payload)

          this.isLogin = true;
        }
      },
        error => {
          this.alerts.alertError({
            type: 'error', payload: {
              title: 'Thông báo',
              text: 'Không thể kết nối với máy chủ',
            }
          }.payload)

          this.isLogin = true;
        }
      )
  }
}
