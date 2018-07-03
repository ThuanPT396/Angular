import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Chart } from '../../model/chart.model';

@Component({
  selector: 'app-chart-month',
  templateUrl: './chart-month.component.html',
  styleUrls: ['./chart-month.component.css'],
  providers:[AppointmentService]
})
export class ChartMonthComponent implements OnInit {

  username = localStorage.getItem('username')
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService
    .postChartByMonth(this.username,"2017-06-06","2019-07-07")
    .subscribe((response) => {
      var tmp = JSON.parse(JSON.stringify(response));
      for (var i in tmp.value) {
        var app = tmp.value[i];
        var result = new Chart(app.total,app.present,app.date);
        console.log(result)
      }
    })
  }
}
