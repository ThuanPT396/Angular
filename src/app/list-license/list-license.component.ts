import { Component, OnInit, ViewChild } from '@angular/core';
import { LicenseService } from './license.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { License } from '../model/license.model';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { Final } from '../Const';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-license',
  templateUrl: './list-license.component.html',
  styleUrls: ['./list-license.component.css'],
  providers: [LicenseService]
})
export class ListLicenseComponent implements OnInit {
  ELEMENT_DATA: License[] = [];
  licenseID=0;
  name="";
  price=0;
  duration=0;
  description="";
  displayedColumns = ['position','license','name', 'price', 'duration', 'description', 'function'];
  dataSource = new MatTableDataSource<License>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private licenseService: LicenseService, private http: HttpClient) {
    this.licenseService
      .getLicenses()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var license = tmp.value[i];
          var result = new License(license.licenseID,license.price,license.duration,license.name,license.description);
          this.ELEMENT_DATA.push(result);
          
        }
        this.dataSource.filter = "";
      })
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRemoveLicense(licenseID: number) {
   
    // const index = this.ELEMENT_DATA.findIndex(license => license.licenseID === licenseID);
    // this.http
    //   .post<BaseResponse<License[]>>(`${Final.API_ENDPOINT}/license/update`,
    //     {
    //       price: this.ELEMENT_DATA[index].username,
    //       duration: this.ELEMENT_DATA[index].password,
    //       name: this.ELEMENT_DATA[index].fullName,
    //       description: this.ELEMENT_DATA[index].phoneNumber,
    //     })
    //   .subscribe((response) => {
    //     console.log(response);
    //     alert("Remove Administrator is successfully.")

    //   },
    //     error => {
    //       console.error("Error delete user!");
    //       alert("Remove Administrator is fail.")
    //       return throwError(error);  // Angular 6/RxJS 6
    //     }
    //   );
    // this.ELEMENT_DATA.splice(index, 1);
    // this.dataSource.filter = "";
  }
  onPushPopup(licenseID:number, name:string, price:number,duration:number,description:string){
    const index = this.ELEMENT_DATA.findIndex(user => user.licenseID === licenseID);
    this.licenseID=licenseID;
    this.price = price;
    this.name = name;
    this.duration = duration;
    this.description = description;
  }

  onUpdateLicense(licenseID:number){
    const index = this.ELEMENT_DATA.findIndex(license => license.licenseID === licenseID);
    this.ELEMENT_DATA[index].price = this.price;
    this.ELEMENT_DATA[index].name=this.name;
    this.ELEMENT_DATA[index].duration=this.duration;
    this.ELEMENT_DATA[index].description=this.description;
    this.http
      .post<BaseResponse<License[]>>(`${Final.API_ENDPOINT}/license/update`,
        {
          licenseID:this.ELEMENT_DATA[index].licenseID,
          price: this.price,
          duration: this.duration,
          name:this.name, 
          description: this.description
        })
      .subscribe((response) => {
        console.log(response);
        alert("Update License is successfully.")

      },
        error => {
          console.error("Error update license!");
          alert("Update License is fail.")
          return throwError(error);  // Angular 6/RxJS 6
        }
      );
    this.dataSource.filter = "";
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

