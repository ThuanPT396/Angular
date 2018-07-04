import { DatePipe } from "@angular/common";

export function drawChartForDate(data, month) {
  var pipe = new DatePipe('en-US');
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart);  
  var daysNum = new Date(month.getYear(), month.getMonth(), 0).getDate();
  function drawChart() {
    var arr = [];
    arr.push(['Ngày trong tháng', 'Tổng', 'Có mặt']);    
    for(let i = 1; i <= daysNum; i++){
      arr.push([i.toString(), 0, 0]);
    }
    
    for (let i = 0; i < data.length; i++) {
      var format = pipe.transform(data[i].date, 'd');
      var tmp = parseInt(format - 1);
      console.log(tmp);
      console.log(data[i]);
      arr[tmp] = [tmp.toString(), data[i].total, data[i].present];
    }

    var list = google.visualization.arrayToDataTable(arr);
    var options = {
      chart: {
        title: 'Thống kê các ngày trong tháng',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
      vAxis: {
              title: 'Số bệnh nhân'
            }
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_date'));

    chart.draw(list, google.charts.Bar.convertOptions(options));
  }
}

export function drawChartForMonth(data) {
  
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart1);
  console.log(data)
  function drawChart1() {
    var arr = [];
    arr.push(['Tháng trong Năm', 'Tổng', 'Có mặt']);
    for(let i = 1 ; i <= 12; i++){
      arr.push([i.toString(), 0, 0]);
    }
    for (let i = 0; i < data.length; i++) {
      arr[data[i].month] = [data[i].month.toString(), data[i].total, data[i].present];      
    }
    console.log(arr)
    var list = google.visualization.arrayToDataTable(arr);
    var options = {
      chart: {
        title: 'Thống kê các tháng trong năm',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
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
    arr.push(['Các Năm', 'Tổng', 'Có mặt']);
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
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
      vAxis: {
        title: 'Số bệnh nhân'
      }
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_year'));

    chart.draw(list, google.charts.Bar.convertOptions(options));
  }
}


