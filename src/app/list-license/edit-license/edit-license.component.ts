import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../../model/BaseResponse.model';
import { License } from '../../model/license.model';
import { throwError } from 'rxjs';
import { Final } from '../../Const';
import { LicenseService } from '../../service/license.service';

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
  constructor(private licenseService:LicenseService) { }

  ngOnInit() {}
  onAddItem() {
    // this.http
    // .post<BaseResponse<License[]>>(`${Final.API_ENDPOINT}/license/create`,
    //   {
    //     price: this.price,
    //     duration: this.duration,
    //     name: this.name,
    //     description: this.description
    //   })
    this.licenseService
    .postCreateLicense(this.price,this.duration,this.name,this.description)
    .subscribe((response) => {
      console.log(response);
      alert("Create License is successfully.")
    },
      error => {
        console.error("Error saving license!");
        alert("Create Administrator is fail.")
        return throwError(error);  // Angular 6/RxJS 6
      }
    );
  }

}
