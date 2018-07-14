import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { FormControl } from '@angular/forms';
import { ToasterService } from '../../service/toast/toaster.service';
import { MatDatepicker } from '@angular/material';
import * as moment from 'moment'
import * as GGChart from "../../../chart.js";
import { Chart } from '../../model/chart.model';
import { bind } from '../../../../node_modules/@angular/core/src/render3/instructions';
import { basename } from 'path';
@Component({
  selector: 'app-chart-line-month',
  templateUrl: './chart-line-month.component.html',
  styleUrls: ['./chart-line-month.component.css'],
  providers: [AppointmentService]
})
export class ChartLineMonthComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2030, 0, 1);
  endDate = new Date();
  startDate = new Date(this.endDate.getFullYear() - 2, this.endDate.getMonth(), this.endDate.getDate());
  startPicker = new FormControl(this.startDate);
  endPicker = new FormControl(this.endDate);
  selectedYear = new Date();
  constructor(private appointmentService: AppointmentService, private toastService: ToasterService) { }

  ngOnInit() {
    this.loadDataToChart(this.startDate, this.endDate)
  }
  chosenYearStartHandler(year: Date, datepicker: MatDatepicker<string>) {

    if (this.minDate > year || this.maxDate < year) {
      this.toastService.Error("Năm bắt đầu phải nằm trong vùng cho phép")
      datepicker.close();
      return;
    }
    if (year > this.endPicker.value) {
      this.toastService.Error("Năm bắt đầu phải nhỏ hơn năm kết thúc")
      datepicker.close();
      return;
    }
    this.startPicker.setValue(year);
    datepicker.close();
    this.loadDataToChart(this.startPicker.value, this.endPicker.value);
  }

  chosenYearEndHandler(year: Date, datepicker: MatDatepicker<string>) {
    if (this.minDate > year || this.maxDate < year) {
      this.toastService.Error("Năm kết thúc phải nằm trong vùng cho phép")
      datepicker.close();
      return;
    }
    if (this.startPicker.value > year) {
      this.toastService.Error("Năm kết thúc phải lớn hơn năm bắt đầu")
      datepicker.close();
      return;
    }
    this.endPicker.setValue(year);
    datepicker.close();
    this.loadDataToChart(this.startPicker.value, this.endPicker.value);
  }

  loadDataToChart(startDate: Date, endDate: Date) {
    var mStart = moment(startDate).startOf("year");
    var mEnd = moment(endDate).endOf("year");
    var username = localStorage.getItem('username');
    this.appointmentService
      .postChartByMonth(username, mStart.format("YYYY-MM-DD"), mEnd.format("YYYY-MM-DD"))
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        var datas = [];
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Chart(app.total, app.present, null, app.month, app.year);
          datas.push(result);
        }
        // tinh tong so nam
        // datas is List<Chart>()
        var peopleInMonths = []
        // init value
        for (var a = 1; a < 13; ++a) {
          peopleInMonths[a] = 0;
        }
        for (var i in datas) {
          var data = datas[i];
          if (data.month) {
            peopleInMonths[data.month] = data.present + peopleInMonths[data.month];
          }
        }

        var totalYears = mEnd.year() - mStart.year() + 1;
        if (totalYears <= 0) {
          totalYears = 1;
        }
        var dataAvg = [];
        for (var b = 1; b < 13; ++b) {
          dataAvg.push(new Chart(
            "0",
            Math.round((peopleInMonths[b] / totalYears)), //present            
            null, //date
            b, //month 
            2018//year
          ));
        }

        /**     Chart:
         *          public total: string,
                    public present: number,
                    public date: Date,
                    public month: number,
                    public year:number
         */

        GGChart.drawChartLineAvg(dataAvg, mStart.year(), mEnd.year());
      })
  }
}
