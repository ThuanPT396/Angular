
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { setTheme } from 'ngx-bootstrap';
import { MessagingService } from './service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[MessagingService]
})

export class AppComponent implements OnInit {
  message;
  constructor(private permissionsService: NgxRolesService,
    private http: HttpClient,
    private msgService: MessagingService) { 
      setTheme('bs4');
    }

  ngOnInit() {
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
    this.permissionsService.addRoles({
      'ADMIN': () => {
        if (localStorage.getItem('role') == '0') {
          return true;
        }else{
          return false;
        }
      },
      'CLINIC': () => {
        if (localStorage.getItem('role') == '1') {
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

