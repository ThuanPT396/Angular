import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Chart } from '../../model/chart.model';
import * as GGChart from "../../../chart.js";
import { FormControl } from '@angular/forms';
import { MatDatepicker, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import * as moment from 'moment'

@Component({
  selector: 'app-chart-month',
  templateUrl: './chart-month.component.html',
  styleUrls: ['./chart-month.component.css'],
  providers:[AppointmentService ]
})
export class ChartMonthComponent implements OnInit {
  datePicker = new FormControl(new Date());
  username = localStorage.getItem('username')
  selectedYear = new Date();
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.loadDataToChart(this.selectedYear)
  }

  chosenYearEndHandler(year: Date, datepicker: MatDatepicker<string>) {
    this.datePicker.setValue(year);    
    this.loadDataToChart(year);
    datepicker.close();        
  }

  loadDataToChart(year: Date) {
    var mStart = moment(year).startOf("year");;
    var mEnd = moment(year).endOf("year");

    this.appointmentService
      .postChartByMonth(this.username, mStart.format("YYYY-MM-DD"), mEnd.format("YYYY-MM-DD"))
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));        
        var data = [];
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Chart(app.total, app.present, null, app.month, app.year);
          data.push(result);
        }
        GGChart.drawChartForMonth(data,mStart.year());
      });
  }
}
