import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PageEvent, MatTableDataSource, MatSort, MatPaginator, MAT_DATE_LOCALE, MatDatepicker, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../model/appointment.model';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Chart } from '../model/chart.model';
@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }, { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }, AppointmentService],
})
export class ListPatientComponent implements OnInit {
  ELEMENT_DATA: Appointment[] = [];
  pipe = new DatePipe('en-US');
  d = new Date();
  day = this.d.getDate();
  month = this.d.getMonth() + 1;
  year = this.d.getFullYear();
  currentDate = this.year + "/" + this.month + "/" + this.day;
  date = new FormControl(new Date());
  fullName = "";
  phoneNumber = "";
  username = localStorage.getItem('username')
  disabled = false;
  disabledCheckBox = false;
  selectedDate = new Date();
  // MatPaginator Outputs
  pageEvent: PageEvent;
  selectedRowIndex;

  displayedColumns = ['position', 'username', 'phoneNumber', 'workingHour', 'attendance', 'function'];
  dataSource = new MatTableDataSource<Appointment>(this.ELEMENT_DATA);
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private appointmentService: AppointmentService, private toastService: ToasterService, private dialog: DialogService) { }
  ngOnInit() {
    this.date;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    var d = this.currentDate;
    this.onGetList(d);
    
  }
  deadline(id: number) {
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId === id);
    var appTime = this.ELEMENT_DATA[index].appointmentTime
    var curTime = this.ELEMENT_DATA[index].currentTime
    if (appTime == curTime) {

    }
  };
  onGetList(date: string) {
    this.appointmentService
      .getAppointments(this.username, date)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        var isCurrent = false;
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Appointment(app.appointmentID, app.appointmentTime, app.no, app.currentTime, app.status, false, app.fullName, app.phoneNumber, app.isBlock, false);
          if (!isCurrent && result.appointmentTime >= result.currentTime) {
            isCurrent = true;
            result.isCurrentAppointment = true;
          }
          if (result.isBlock === 1) {
            result.BisBlock = true
          }
          this.ELEMENT_DATA.push(result);
        }
        this.dataSource.data = this.ELEMENT_DATA;
      },
        error => {
          this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
        })
  }
  onSelect(appID: number, choose: string) {
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId == appID);
    if (this.ELEMENT_DATA[index].currentTime < this.ELEMENT_DATA[index].appointmentTime) {
      this.disabledCheckBox = true;
      return;
    }
    this.appointmentService
      .postCheckStatus(this.username, appID, !choose)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Đổi trạng thái thành công")
        }
        else {
          this.toastService.Error("Đổi trạng thái thất bại")
        }
      },
        error => {
          this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
        }
      );
  }
  onGetDate(dateValue: string) {
    var format = this.pipe.transform(dateValue, 'yyyy/M/d')
    this.selectedDate = new Date(dateValue);
    // var d = this.date = dateValue;
    while (this.ELEMENT_DATA.length > 0) {
      this.ELEMENT_DATA.pop();
    }
    console.log(format, this.currentDate)
    if (format != this.currentDate) {
      this.disabled = true;
      console.log(this.disabled)
    } else {
      this.disabled = false;
      console.log(this.disabled)
    }
    this.onGetList(format);

  }
  onPopupPhoneNumber(fullName: string, numberPhone: string) {
    this.fullName = fullName;
    this.phoneNumber = numberPhone;
  }
  onBanPhoneNumber(phoneNumber: string, BisBlock: boolean) {
    var test = BisBlock ? 0 : 1;
    const index = this.ELEMENT_DATA.findIndex(app => app.phoneNumber === phoneNumber);
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].phoneNumber === phoneNumber) {
        this.ELEMENT_DATA[i].BisBlock = !BisBlock;
        this.ELEMENT_DATA[i].isBlock = test;
        // if (this.ELEMENT_DATA[i].BisBlock===true) {
        //   this.ELEMENT_DATA[i].isBlock = 1;
        // }else{
        //   this.ELEMENT_DATA[i].isBlock = 0;
        // }
      }
      console.log(this.ELEMENT_DATA[i]);
    }
    console.log(test)

    this.appointmentService
      .postBlockNumber(this.username, phoneNumber, test)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Đổi trạng thái chặn thành công")
        }
        else {
          this.toastService.Error("Đổi trạng thái chặn thất bại")
        }
      },
        error => {
          this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
        }
      );
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

