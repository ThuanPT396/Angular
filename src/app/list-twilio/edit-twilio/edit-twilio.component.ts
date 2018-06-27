import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../service/toast/toaster.service';
import { DialogService } from '../../service/dialog/dialog.service';
import { TwilioService } from '../../service/twilio.service';

@Component({
  selector: 'app-edit-twilio',
  templateUrl: './edit-twilio.component.html',
  styleUrls: ['./edit-twilio.component.css'],
  providers:[TwilioService]
})
export class EditTwilioComponent implements OnInit {
  phoneNumber = "";
  accountSid = "";
  authToken = "";
  constructor(private twilioService:TwilioService, private toastService: ToasterService, private dialog: DialogService) { }

  ngOnInit() {
  }
  onAddItem() {
    this.twilioService
      .postCreateTwilio(this.phoneNumber, this.accountSid, this.authToken)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Create Twilios Successfully")
          this.phoneNumber = "";
          this.accountSid = "";
          this.authToken = "";
        }
        else {
          this.toastService.Error("Create Twilios Failure")
        }
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        }
      );
  }
}
