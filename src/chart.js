import { DatePipe } from "@angular/common";
import * as moment from 'moment'

Date.prototype.monthDays= function(){
  var d = new Date(this.getFullYear(), this.getMonth()+1, 0);
  return d.getDate();
}

export function drawChartForDate(data, month) {
  var pipe = new DatePipe('en-US');
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart); 
  var daysNum = month.monthDays();
  function drawChart() {
    var arr = [];
    arr.push(['Ngày trong tháng', 'Tổng bệnh nhân', 'Có mặt']);    
    for(let i = 1; i <= daysNum; i++){
      arr.push([i.toString(), 0, 0]);
    }
    for (let i = 0; i < data.length; i++) {
      var format = pipe.transform(data[i].date, 'd');
      var tmp = parseInt(format);
      arr[tmp] = [tmp.toString(), data[i].total, data[i].present];
    }    
    var fMonth = pipe.transform(month, 'M/yyyy');
    var list = google.visualization.arrayToDataTable(arr);    
    var options = {
      chart: {
        title: 'Thống kê các ngày trong tháng',
        subtitle: 'Tháng '+fMonth
      },
      vAxis: {
              title: 'Số bệnh nhân'
            }
    };    
    var chart = new google.charts.Bar(document.getElementById('columnchart_date'));

    chart.draw(list, google.charts.Bar.convertOptions(options));
  }
}

export function drawChartForMonth(data,year) {
  var pipe = new DatePipe('en-US');
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart1);
  function drawChart1() {
    var arr = [];
    arr.push(['Tháng trong Năm', 'Tổng bệnh nhân', 'Có mặt']);
    for(let i = 1 ; i <= 12; i++){
      arr.push(['Tháng ' + i, 0, 0]);
    }
    for (let i = 0; i < data.length; i++) {
      arr[data[i].month] = ['Tháng ' + data[i].month, data[i].total, data[i].present];      
    }
  
    var list = google.visualization.arrayToDataTable(arr);
    var options = {
      chart: {
        title: 'Thống kê các tháng trong năm',
        subtitle: 'Năm '+year,
      },
      vAxis: {
        title: 'Số bệnh nhân'
      }
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_month'));

    chart.draw(list, google.charts.Bar.convertOptions(options));
  }
}


export function drawChartForYear(data, startYear, endYear) {
  var pipe = new DatePipe('en-US');
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart1);
  
  function drawChart1() {
    var arr = [];
    arr.push(['Các Năm', 'Tổng bệnh nhân', 'Có mặt']);
    for(let i = 1; i <= endYear - startYear + 1; i++){
      arr.push([(i - 1 + startYear).toString(), 0, 0]);
    }
    for (let i = 0; i < data.length; i++) {
      arr[data[i].year - startYear + 1] = [data[i].year.toString(), data[i].total, data[i].present];
    }
    var list = google.visualization.arrayToDataTable(arr);
    var options = {
      chart: {
        title: 'Thống kê các năm',
        subtitle: 'Từ năm '+startYear+' Đến năm '+endYear,
      },
      vAxis: {
        title: 'Số bệnh nhân'
      }
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_year'));

    chart.draw(list, google.charts.Bar.convertOptions(options));
  }
}


