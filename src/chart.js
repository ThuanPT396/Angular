import { DatePipe } from "@angular/common";

export function drawChartForDate(data) {
  var pipe = new DatePipe('en-US');

  // google.charts.load('current', { 'packages': ['bar'] });
  // google.charts.setOnLoadCallback(drawChart);

  // function drawChart() {

  //   var list = new google.visualization.DataTable();
  //   list.addColumn('string', 'Ngày trong tháng');
  //   list.addColumn('number', 'Tổng');
  //   list.addColumn('number', 'Có mặt');

  //   // var list = google.visualization.arrayToDataTable([
  //   //   ['Month', 'Sales', 'Expenses'],
  //   // ]);
  //   for (let i = 0; i < data.length; i++) {
  //     var format = pipe.transform(data[i].date, 'd')
  //     var tmp = parseInt(format - 1)
  //     list.addRows([[tmp.toString(), data[i].total, data[i].present]])

  //   }
  //   var options = {
  //     chart: {
  //       title: 'Thống kê các ngày trong tháng',
  //       subtitle: 'từ tháng ' + 3 + ' đến tháng ' + 2,
  //     },
  //     hAxis: {
  //       title: 'Ngày trong tháng',

  //     },
  //     vAxis: {
  //       title: 'Số bệnh nhân'
  //     }
  //   };

  //   var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

  //   chart.draw(list, google.charts.Bar.convertOptions(options));
  // }
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var arr = [];
    arr.push(['Ngày trong tháng', 'Tổng', 'Có mặt']);
    for (let i = 0; i < data.length; i++) {
      var format = pipe.transform(data[i].date, 'd')
      var tmp = parseInt(format - 1)
      arr.push([tmp.toString(), data[i].total, data[i].present])

    }
    console.log(arr)
    var list = google.visualization.arrayToDataTable(arr);
    var options = {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      }
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_date'));

    chart.draw(list, google.charts.Bar.convertOptions(options));
  }
}

export function drawChartForMonth(data) {
  var pipe = new DatePipe('en-US');
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart1);
  console.log(data)
  function drawChart1() {
    var arr = [];
    arr.push(['Tháng trong Năm', 'Tổng', 'Có mặt']);
    for (let i = 0; i < data.length; i++) {
      arr.push([data[i].month, data[i].total, data[i].present])

    }
    console.log(arr)
    var list = google.visualization.arrayToDataTable(arr);
    var options = {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      }
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_month'));

    chart.draw(list, google.charts.Bar.convertOptions(options));
  }
}


