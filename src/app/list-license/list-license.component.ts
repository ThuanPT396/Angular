import { Component, OnInit, ViewChild } from '@angular/core';
import { LicenseService } from '../service/license.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { License } from '../model/license.model';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../model/BaseResponse.model';
import { Final } from '../Const';
import { throwError } from 'rxjs';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';

@Component({
  selector: 'app-list-license',
  templateUrl: './list-license.component.html',
  styleUrls: ['./list-license.component.css'],
  providers: [LicenseService]
})
export class ListLicenseComponent implements OnInit {
  ELEMENT_DATA: License[] = [];
  licenseID = 0;
  name = "";
  price = 0;
  duration = 0;
  description = "";
  isActive = 0;
  displayedColumns = ['position', 'license', 'name', 'price', 'duration', 'description', 'function'];
  dataSource = new MatTableDataSource<License>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private licenseService: LicenseService, private http: HttpClient,private toastService: ToasterService,private dialog: DialogService) {
    this.licenseService
      .getLicenses()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var license = tmp.value[i];
          var result = new License(license.licenseID, license.price, license.duration, license.name, license.description, license.isActive);
          this.ELEMENT_DATA.push(result);

        }
        this.dataSource.filter = "";
      },
      error => {
        this.dialog.openDialog("Attention", "Network is Disconnect");
      })
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRemoveLicense(licenseID: number) {

    const index = this.ELEMENT_DATA.findIndex(license => license.licenseID === licenseID);
    this.licenseService
      .postLicense(this.ELEMENT_DATA[index].licenseID,
        this.ELEMENT_DATA[index].price,
        this.ELEMENT_DATA[index].duration,
        this.ELEMENT_DATA[index].name,
        this.ELEMENT_DATA[index].description, 0
      )
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Remove License Successfully")
        }
        else {
          this.toastService.Error("Remove License Failure")
        }
      },
      error => {
        this.dialog.openDialog("Attention", "Network is Disconnect");
      }
    );
    this.ELEMENT_DATA.splice(index, 1);
    this.dataSource.filter = "";
  }
  onPushPopup(licenseID: number, name: string, price: number, duration: number, description: string) {
    const index = this.ELEMENT_DATA.findIndex(user => user.licenseID === licenseID);
    this.licenseID = licenseID;
    this.price = price;
    this.name = name;
    this.duration = duration;
    this.description = description;
  }

  onUpdateLicense(licenseID: number) {
    const index = this.ELEMENT_DATA.findIndex(license => license.licenseID === licenseID);
    this.ELEMENT_DATA[index].price = this.price;
    this.ELEMENT_DATA[index].name = this.name;
    this.ELEMENT_DATA[index].duration = this.duration;
    this.ELEMENT_DATA[index].description = this.description;
    this.licenseService
      .postLicense(this.ELEMENT_DATA[index].licenseID,
        this.price,
        this.duration,
        this.name,
        this.description, 1)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Update License Successfully")
        }
        else {
          this.toastService.Error("Update License Failure")
        }

      },
      error => {
        this.dialog.openDialog("Attention", "Network is Disconnect");
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

