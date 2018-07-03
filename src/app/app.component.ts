
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { setTheme } from 'ngx-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  constructor(private permissionsService: NgxRolesService,
    private http: HttpClient,) { 
      setTheme('bs4');
    }

  ngOnInit() {

    this.permissionsService.addRoles({
      'ADMIN': () => {
        if (localStorage.getItem('role') == '0') {
          return true;
        }else{
          return false;
        }
      },
      'STAFF': () => {
        if (localStorage.getItem('role') == '2') {
          return true;
        }else{
          return false;
        }
      }
    })
  }
}

