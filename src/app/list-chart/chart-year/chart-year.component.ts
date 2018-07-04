import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Chart } from '../../model/chart.model';
import * as BB from 'src/assets/dist/js/scripts.js'
@Component({
  selector: 'app-chart-year',
  templateUrl: './chart-year.component.html',
  styleUrls: ['./chart-year.component.css'],
  providers:[AppointmentService]
})
export class ChartYearComponent implements OnInit {

  username = localStorage.getItem('username')
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
  
    this.appointmentService
    .postChartByYear(this.username,"2017-06-06","2019-07-07")
    .subscribe((response) => {
      var tmp = JSON.parse(JSON.stringify(response));
      for (var i in tmp.value) {
        var app = tmp.value[i];
        var result = new Chart(app.total,app.present,app.date,0,0);
        console.log(result)
      }
    })

    
  }

}
