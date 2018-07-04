import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Chart } from '../../model/chart.model';
import * as GGChart from "../../../chart.js";
import { FormControl } from '@angular/forms';
import { MatDatepicker, MAT_DATE_FORMATS } from '@angular/material';
import * as moment from 'moment'

@Component({
  selector: 'app-chart-year',
  templateUrl: './chart-year.component.html',
  styleUrls: ['./chart-year.component.css'],
  providers: [AppointmentService]
})
export class ChartYearComponent implements OnInit {
  startPicker = new FormControl(new Date());
  endPicker = new FormControl(new Date());
  selectedYear = new Date();
  username = localStorage.getItem('username')
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.loadDataToChart(this.selectedYear,this.selectedYear)
  }

  chosenYearStartHandler(year: Date, datepicker: MatDatepicker<string>) {
    this.startPicker.setValue(year);
    datepicker.close();
    this.loadDataToChart(this.startPicker.value, this.endPicker.value);
  }

  chosenYearEndHandler(year: Date, datepicker: MatDatepicker<string>) {
    this.endPicker.setValue(year);
    datepicker.close();
    this.loadDataToChart(this.startPicker.value, this.endPicker.value);
  }

  loadDataToChart(startDate: Date, endDate: Date) {
    var mStart = moment(startDate).startOf("year");;
    var mEnd = moment(endDate).endOf("year");    
    if(mStart > mEnd){
      alert("dm");
      return;
    }

    this.appointmentService
      .postChartByYear(this.username, mStart.format("YYYY-MM-DD"), mEnd.format("YYYY-MM-DD"))
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        console.log(tmp);
        var data = [];
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Chart(app.total, app.present, null, 0, app.year);
          data.push(result);
        }
        GGChart.drawChartForYear(data, mStart.year(), mEnd.year());
      })
  }
}
