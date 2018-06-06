import { Component, OnInit, ViewChild } from '@angular/core';
import { LicenseService } from './license.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { License } from '../model/license.model';

@Component({
  selector: 'app-list-license',
  templateUrl: './list-license.component.html',
  styleUrls: ['./list-license.component.css'],
  providers: [LicenseService]
})
export class ListLicenseComponent implements OnInit {
  displayedColumns = ['position','license', 'price', 'duration','name', 'description', 'function'];
  dataSource = new MatTableDataSource<License>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private licenseService: LicenseService) {
    this.licenseService
      .getLicenses()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        console.log(tmp);
        for (var i in tmp.value) {
          var license = tmp.value[i];
          var result = new License(license.licenseID,license.price,license.duration,license.name,license.description);
          console.log(result);
          ELEMENT_DATA.push(result);
          
        }
        this.dataSource.filter = "";
      })
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRemoveLicense(name: string) {
   
    const index = ELEMENT_DATA.findIndex(license => license.name === name);
    //ELEMENT_DATA[index].isActive = this.active + "";
    ELEMENT_DATA.splice(index, 1);
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
const ELEMENT_DATA: License[] = [];
