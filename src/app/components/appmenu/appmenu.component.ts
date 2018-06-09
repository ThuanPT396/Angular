import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

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
