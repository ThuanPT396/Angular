import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Clinic } from '../../model/clinic.model';

@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.component.html'
})
export class ClinicEditComponent implements OnInit {
  isActive='true';
  role='clinic';
  constructor() {}

  ngOnInit() {
  }
  onAddItem() {
   
  }
}
