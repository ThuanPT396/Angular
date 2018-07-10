import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import * as moment from 'moment'
import { Chart } from '../../model/chart.model';
import * as GGChart from "../../../chart.js";
@Component({
  selector: 'app-chart-line-month',
  templateUrl: './chart-line-month.component.html',
  styleUrls: ['./chart-line-month.component.css'],
  providers:[AppointmentService ]
})
export class ChartLineMonthComponent implements OnInit {
  selectedYear = new Date();
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.loadDataToChart(this.selectedYear)
  }


  loadDataToChart(year: Date) {
    var mStart = moment(year).startOf("year");;
    var mEnd = moment(year).endOf("year");

    this.appointmentService
      .postChartByMonth('hoanghoa', mStart.format("YYYY-MM-DD"), mEnd.format("YYYY-MM-DD"))
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));        
        var data = [];
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Chart(app.total, app.present, null, app.month, app.year);
          data.push(result);
        }
        GGChart.drawChartLineForMonth(data,mStart.year());
      });
  }
}
