import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  username = ""
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.username = this.userService.getUserClaims();

  }
  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login'])
  }
}
