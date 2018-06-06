import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../../model/BaseResponse.model';
import { License } from '../../model/license.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit-license',
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.css']
})
export class EditLicenseComponent implements OnInit {
  name="";
  price="";
  duration="";
  description="";
  constructor(private http: HttpClient) { }

  ngOnInit() {}
  onAddItem() {
    this.http
    .post<BaseResponse<License[]>>('http://27.74.245.84:8080/license/create',
      {
        price: this.price,
        duration: this.duration,
        name: this.name,
        description: this.description
      })
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
