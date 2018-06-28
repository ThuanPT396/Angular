import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }, AppointmentService],
})
export class ListBlockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
