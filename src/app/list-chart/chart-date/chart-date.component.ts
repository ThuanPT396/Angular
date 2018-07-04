import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Chart } from '../../model/chart.model';
import * as GGChart from "../../../chart.js";
import { FormControl } from '@angular/forms';
import * as moment from 'moment'
import { MatDatepicker, MAT_DATE_FORMATS } from '@angular/material';



export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-chart-date',
  templateUrl: './chart-date.component.html',
  styleUrls: ['./chart-date.component.css'],
  providers: [AppointmentService,{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class ChartDateComponent implements OnInit {
  
  datePicker = new FormControl(new Date());
  // pipe = new DatePipe('en-US');
  username = localStorage.getItem('username')
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService
      .postChartByDate(this.username, "2018-06-01", "2018-07-01")
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        var data = [];
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Chart(app.total, app.present, app.date);
          data.push(result);
        }
        GGChart.drawChartForDate(data);
      });
  }

  chosenYearHandler(normalizedYear: Date) {
    var mDate = moment(normalizedYear)    
    this.datePicker.setValue(mDate.toDate());
  }
  chosenMonthHandler(normlizedMonth: Date, datepicker: MatDatepicker<string>) {
    var mSelectedDate = moment(this.datePicker.value);
    var mMonth = moment(normlizedMonth);    
    mSelectedDate.month(mMonth.month());
    this.datePicker.setValue(mSelectedDate.toDate());
    datepicker.close();
  }
}
