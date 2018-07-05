import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Chart } from '../../model/chart.model';
import * as GGChart from "../../../chart.js";
import { FormControl } from '@angular/forms';
import * as moment from 'moment'
import { MatDatepicker } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart-date',
  templateUrl: './chart-date.component.html',
  styleUrls: ['./chart-date.component.css'],
  providers: [AppointmentService]
})
export class ChartDateComponent implements OnInit {
  ELEMENT_DATA: Chart[] = [];
  pipe = new DatePipe('en-US');
  datePicker = new FormControl(new Date());
  selectedMonth = new Date();
  nextMonth = new Date();
  username = localStorage.getItem('username')
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    // var mSelectedMonth = moment(this.selectedMonth);
    // mSelectedMonth.format("MM/YYYY")
    
    this.loadData(this.selectedMonth);
  }

  loadData(month: Date) {
    console.log(month);
    var mMonth = moment(month);
    var startDate = mMonth.startOf("month").format("YYYY-MM-DD");
    var endDate = mMonth.endOf("month").format("YYYY-MM-DD");
    console.log(startDate);
    console.log(endDate);
    this.appointmentService
      .postChartByDate(this.username, startDate, endDate)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        while (this.ELEMENT_DATA.length > 0) {
          this.ELEMENT_DATA.pop();
        }
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Chart(app.total, app.present, app.date, 0, 0);
          this.ELEMENT_DATA.push(result);
        }
        GGChart.drawChartForDate(this.ELEMENT_DATA, month);
      });
  }

  chosenYearHandler(normalizedYear: Date) {
    var mDate = moment(normalizedYear)
    this.datePicker.setValue(mDate.toDate());
  }
  chosenMonthHandler(normlizedMonth: Date, datepicker: MatDatepicker<Date>) {
    var mSelectedDate = moment(this.datePicker.value);
    var mMonth = moment(normlizedMonth);
    mSelectedDate.month(mMonth.month());
    this.datePicker.setValue(mSelectedDate.toDate());
    this.loadData(mSelectedDate.toDate());
    datepicker.close();
  }

}
