import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { ToasterService } from '../../service/toast/toaster.service';
import { DialogService } from '../../service/dialog/dialog.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css'],
  providers:[StaffService]
})
export class EditStaffComponent implements OnInit {
  username = "";
  textCheckUsername="";
  phoneNumber = "";
  fullName = "";
  email = "";
  isActive = 'true';
  role = '2';
  hasErrorUsername=false;
  hasErrorPhoneNumber=false;
  hasErrorEmail=false;
  hiddenicon = true;
  constructor(private staffService: StaffService, private toastService: ToasterService, private dialog: DialogService) { }

  ngOnInit() {
  }
  onAddItem() {
    if (this.username !== "") {
      this.staffService
      .postCreateStaff(this.username, this.fullName, this.phoneNumber, this.email)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Create Staff Successfully")
          this.username = "";
          this.phoneNumber = "";
          this.fullName = "";
          this.email = "";
        }
        else {
          this.toastService.Error("Create Staff Failure. Username is duplicate!!!")
        }
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        }
      );
    }else{
      this.dialog.openDialog("Attention", "Username cannot empty");
    }
   
  }
  checkUsername(username: string) {
    this.staffService
      .staffCheckUsername(username)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          if (this.username=='') {
            this.hasErrorUsername=true;
            return;
          }
          this.hasErrorUsername=false;
        }else{
          this.hasErrorUsername=true;
        }
      })
  }

  checkPhoneNumber(phoneNumber: string) {
    this.staffService
      .staffCheckPhoneNumber(phoneNumber)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          if (this.phoneNumber=='') {
            this.hasErrorPhoneNumber=true;
            return;
          }
          this.hasErrorPhoneNumber=false;
        }else{
          this.hasErrorPhoneNumber=true;
        }
      })
  }

  checkEmail(email: string) {
    this.staffService
      .staffCheckEmail(email)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          if (this.email=='') {
            this.hasErrorEmail=true;
            return;
          }
          this.hasErrorEmail=false;
        }else{
          this.hasErrorEmail=true;
        }
      })
  }
}
