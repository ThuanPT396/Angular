import { Component, OnInit, ViewChild } from '@angular/core';
import { TwilioService } from '../service/twilio.service';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';
import { Twilio } from '../model/twilio.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-list-twilio',
  templateUrl: './list-twilio.component.html',
  styleUrls: ['./list-twilio.component.css'],
  providers:[TwilioService]
})
export class ListTwilioComponent implements OnInit {
  ELEMENT_DATA: Twilio[] = [];
  displayedColumns = ['position', 'phoneNumber', 'accountSid', 'authToken'];
  dataSource = new MatTableDataSource<Twilio>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private twilioService:TwilioService,private toastService: ToasterService,private dialog: DialogService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.twilioService
      .getTwilio()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var twilio = tmp.value[i];
          var result = new Twilio(twilio.phoneNumber,twilio.accountSid,twilio.authToken);
          this.ELEMENT_DATA.push(result);

        }
        this.dataSource.filter = "";
      },
      error => {
        this.dialog.openDialog("Attention", "Cannot connect network!");
      })
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
