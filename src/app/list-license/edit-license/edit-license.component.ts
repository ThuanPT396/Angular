import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../../model/BaseResponse.model';
import { License } from '../../model/license.model';
import { throwError } from 'rxjs';
import { Final } from '../../Const';
import { LicenseService } from '../../service/license.service';
import { ToasterService } from '../../service/toast/toaster.service';

@Component({
  selector: 'app-edit-license',
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.css'],
  providers:[LicenseService]
})
export class EditLicenseComponent implements OnInit {
  name="";
  price="";
  duration="";
  description="";
  constructor(private licenseService:LicenseService,private toastService:ToasterService) { }

  ngOnInit() {}
  onAddItem() {
    this.licenseService
    .postCreateLicense(this.price,this.duration,this.name,this.description,1)
    .subscribe((response) => {
      var tmp = JSON.parse(JSON.stringify(response));
      if (tmp.status == true) {
        this.toastService.Success("Create License Successfully")
      }
      else {
        this.toastService.Error("Create License Failure")
      }
    },
    );
  }

}
