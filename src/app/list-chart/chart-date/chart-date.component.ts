import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Chart } from '../../model/chart.model';
import * as GGChart from "../../../chart.js";

@Component({
  selector: 'app-chart-date',
  templateUrl: './chart-date.component.html',
  styleUrls: ['./chart-date.component.css'],
  providers: [AppointmentService]
})
export class ChartDateComponent implements OnInit {


  username = localStorage.getItem('username')
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    // GGChart.dm(["abc", "cds", "ds"]);
    this.appointmentService
      .postChartByDate(this.username, "2017-06-06", "2019-07-07")
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
}
