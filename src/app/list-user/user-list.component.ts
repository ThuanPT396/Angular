import { Component, OnInit, Input } from '@angular/core';

import { User } from '../model/user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  message: string;
  avtived = "false";
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe((response) => {
        this.users = response.value;
        var ajaxObj = {
          "data": this.users
        };
        console.log(this.users);

        this.dtOptions = {
          pagingType: 'full_numbers',
          ajax: ajaxObj
        };

      });
  }
}

