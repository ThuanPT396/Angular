import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Clinic } from '../../model/clinic.model';

@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.component.html'
})
export class ClinicEditComponent implements OnInit {
  isActive='true';
  role='clinic';
  @ViewChild('inputUserName') userNameInputRef: ElementRef;
  @ViewChild('inputPassword') passwordInputRef: ElementRef;
  @ViewChild('inputClinicName') clinicNameInputRef: ElementRef;
  @ViewChild('inputAddress') addressInputRef: ElementRef;
  @ViewChild('inputStartWorking') startWorkingInputRef: ElementRef;
  @ViewChild('inputEndWorking') endWorkingInputRef: ElementRef;
  @ViewChild('inputPhoneNumber') phoneNumberInputRef: ElementRef;
  @Output() ClinicAdded = new EventEmitter<Clinic>();
  constructor() {}

  ngOnInit() {
  }
  onAddItem() {
    const ingUserName = this.userNameInputRef.nativeElement.value;
    const ingPassword = this.passwordInputRef.nativeElement.value;
    const ingClinicName =  this.clinicNameInputRef.nativeElement.value;
    const ingAddress = this.addressInputRef.nativeElement.value;
    const ingStartWorking = this.startWorkingInputRef.nativeElement.value;
    const ingEndWorking =  this.endWorkingInputRef.nativeElement.value;
    const ingPhoneNumber = this.phoneNumberInputRef.nativeElement.value;
    const newClinic = new Clinic(ingUserName,ingPassword,ingClinicName,ingAddress,ingPhoneNumber,ingStartWorking,ingEndWorking,this.role,this.isActive);
    this.ClinicAdded.emit(newClinic);
  }
}
