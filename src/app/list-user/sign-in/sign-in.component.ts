import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
  }
  OnSubmit(username, password) {
    this.userService
    .userAuthentication(username,password)
    .subscribe(response => {
      var tmp = JSON.parse(JSON.stringify(response));
      console.log(response);
      console.log(tmp.status);
      if (tmp.status == true) {
        alert("Success")
        localStorage.setItem('username',tmp.value.username);
        this.router.navigate(['/home'])
      } else {
        alert("Invalid")
      }
    })
  console.log(username, password)
  }
}
