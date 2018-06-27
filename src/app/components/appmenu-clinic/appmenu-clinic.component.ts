import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-appmenu-clinic',
  templateUrl: './appmenu-clinic.component.html',
  styleUrls: ['./appmenu-clinic.component.css']
})
export class AppmenuClinicComponent implements OnInit {
  fullName = ""
  constructor(private userService: UserService) { }

  ngOnInit() {
    var result = this.userService.getUserClaims();
    this.fullName = result.clinicName;
  }

}
