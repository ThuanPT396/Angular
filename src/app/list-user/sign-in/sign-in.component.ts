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

  constructor(private userService: UserService, private router: Router, private dialog: DialogService) { }

  ngOnInit() {
  }
  OnSubmit(username, password) {
    this.userService
      .userAuthentication(username, password)

      .subscribe(response => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          localStorage.setItem('username', tmp.value.username);
          localStorage.setItem('fullName', tmp.value.fullName);
          localStorage.setItem('role',tmp.value.role);
          this.router.navigate(['/home'])
        } else {
          this.dialog.openDialog("Attention", "Usename or Password is wrong");
        }
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        })
  }
}
