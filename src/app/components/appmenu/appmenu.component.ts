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
  fullName = ""
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    var result = this.userService.getUserClaims();
    this.fullName = result.fullName

  }
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    this.router.navigate(['/login'])
  }
}
