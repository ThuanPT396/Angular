import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-appmenu-staff',
  templateUrl: './appmenu-staff.component.html',
  styleUrls: ['./appmenu-staff.component.css']
})
export class AppmenuStaffComponent implements OnInit {
  fullName = ""
  constructor(private userService: UserService) { }

  ngOnInit() {
    var result = this.userService.getUserClaims();
    this.fullName = result.fullName
  }

}
