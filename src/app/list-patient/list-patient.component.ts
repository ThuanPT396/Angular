import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PageEvent, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../model/appointment.model';
@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css'],
  providers: [AppointmentService],
})
export class ListPatientComponent implements OnInit {
  myStyle = "{color:'red'}"
  ELEMENT_DATA: Appointment[] = [];
  d = new Date();
  day = this.d.getDate();
  month = this.d.getMonth() + 1;
  year = this.d.getFullYear();
  currentDate = this.year + "/0" + this.month + "/" + this.day;
  date = this.currentDate;
  username = localStorage.getItem('username')
  disabled= false;
  // MatPaginator Outputs
  pageEvent: PageEvent;
  selectedRowIndex;

  displayedColumns = ['position', 'username', 'phoneNumber', 'workingHour', 'function'];
  dataSource = new MatTableDataSource<Appointment>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private appointmentService: AppointmentService, private toastService: ToasterService, private dialog: DialogService) { }
  ngOnInit() {
    var d = this.currentDate
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.onGetList(d);
    console.log(d)
    
  }
  onGetList(date: string) {
    this.appointmentService
      .getAppointments(this.username, date)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var app = tmp.value[i];
          
          var result = new Appointment(app.appointmentID, app.appointmentTime, app.no, app.patient, app.currentTime, app.status);
          this.ELEMENT_DATA.push(result);
        }
        this.dataSource.data = this.ELEMENT_DATA;
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        })
  }
  onSelect(appID: string, choose: string) {
    this.appointmentService
      .postCheckStatus(this.username, appID, choose)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Change Status Successfully")
        }
        else {
          this.toastService.Error("Change Status Failure")
        }
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        }
      );
  }
  onGetDate(dateValue: string) {
    // var d = this.date = dateValue;
    while (this.ELEMENT_DATA.length > 0) {
      this.ELEMENT_DATA.pop();
    }
    this.onGetList(dateValue);
    console.log(dateValue)
    if (dateValue != this.currentDate) {
      this.disabled = true;
    }else{
      this.disabled = false;
    }
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

