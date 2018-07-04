import { DatePipe } from "@angular/common";

export function drawChartForDate(data) {
    var pipe = new DatePipe('en-US');
    // google.charts.load('current', { packages: ['corechart', 'bar'] });
    // google.charts.setOnLoadCallback(drawAnnotations);

    // function drawAnnotations() {
    //     var list = new google.visualization.DataTable();
    //     list.addColumn('timeofday', 'Ngày trong tháng');
    //     list.addColumn('number', 'Có mặt');
    //     list.addColumn('number', 'Tổng');

    //     for (let i = 0; i < data.length; i++) {
    //         list.addRows([[{ v: [(i+1), 0, 0] }, data[i].present, data[i].total]])
    //     }
    //     var options = {
    //         title: 'Thống kê các ngày trong tháng',
    //         subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    //         annotations: {
    //             alwaysOutside: true,
    //             textStyle: {
    //                 fontSize: 14,
    //                 color: '#000',
    //                 auraColor: 'none'
    //             }
    //         },
    //         hAxis: {
    //             title: 'Ngày trong tháng',
    //             format: 'd-M-yyyy ',
    //         },
    //         vAxis: {
    //             title: 'Số lượng bệnh nhân'
    //         }
    //     };
    //     var chart = new google.charts.Bar(document.getElementById('chart_div'));
    //     chart.draw(list, google.charts.Bar.convertOptions(options));
    // }
    google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
          
        var list = new google.visualization.DataTable();
        list.addColumn('string', 'Ngày trong tháng');
        list.addColumn('number', 'Có mặt');
        list.addColumn('number', 'Tổng');
        // var list = google.visualization.arrayToDataTable([
        //   ['Month', 'Sales', 'Expenses'],
          
         
        // ]);
        for (let i = 0; i < data.length; i++) {
            var format = pipe.transform(data[i].date, 'd')
            var tmp=parseInt(format-1)
            list.addRows([[ tmp.toString(), data[i].present, data[i].total]])
        }
        var options = {
          chart: {
            title: 'Thống kê các ngày trong tháng',
            subtitle: 'từ tháng '+3+' đến tháng '+2,
          },
          hAxis: {
            title: 'Ngày trong tháng',
            
          },
          vAxis:{
              title:'Số bệnh nhân'
          }
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(list, google.charts.Bar.convertOptions(options));
      }
}


