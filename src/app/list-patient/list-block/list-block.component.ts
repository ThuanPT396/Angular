import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_LOCALE, PageEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppointmentService } from '../../service/appointment.service';
import { PhoneNumber } from '../../model/phoneNumber.model';
import { ToasterService } from '../../service/toast/toaster.service';
import { DialogService } from '../../service/dialog/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxAlertsService } from '@ngx-plus/ngx-alerts';

@Component({
  selector: 'app-list-block',
  templateUrl: './list-block.component.html',
  styleUrls: ['./list-block.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }, AppointmentService],
})
export class ListBlockComponent implements OnInit {
  ELEMENT_DATA:PhoneNumber[]=[];
  username = localStorage.getItem('username')
  pageEvent: PageEvent;
  selectedRowIndex;

  displayedColumns = ['position', 'phoneNumber','function'];
  dataSource = new MatTableDataSource<PhoneNumber>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private appointmentService: AppointmentService,
     private toastService: ToasterService, 
     private dialog: DialogService,
     private spinner: NgxSpinnerService,
     private alerts: NgxAlertsService,) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.spinner.show();
    this.onGetList()
  }
  onGetList(){
    
    this.appointmentService
    .getPhoneNumberBlock(this.username)
    .subscribe(response =>{
      this.spinner.hide();
      var tmp = JSON.parse(JSON.stringify(response));
      var isCurrent = false;
      for (var i in tmp.value) {
        var app = tmp.value[i];
        var result = new PhoneNumber(app.blockID,app.clinicUsername,app.phoneNumber,app.isBlock);
        this.ELEMENT_DATA.push(result);
      }
      this.dataSource.data = this.ELEMENT_DATA;
    },
      error => {
        this.spinner.hide();
        this.alerts.alertError({
          type: 'error', payload: {
            title: 'Thông báo',
            text: 'Không thể kết nối với máy chủ',
          }
        }.payload)
      } )
  }
  onRemovePhoneNumber(phoneNumber:string){
    this.spinner.show();
    const index = this.ELEMENT_DATA.findIndex(user => user.phoneNumber === phoneNumber);
    this.appointmentService
    .postBlockNumber(this.username, phoneNumber, 0)
    .subscribe((response) => {
      this.spinner.hide();
      var tmp = JSON.parse(JSON.stringify(response));
      if (tmp.status == true) {
        this.ELEMENT_DATA.splice(index, 1);
        this.toastService.Success("Xóa chặn chặn thành công")
        this.dataSource.filter = "";
      }
      else {
        this.alerts.alertError({
          type: 'error', payload: {
            title: 'Thông báo',
            text: 'Xóa Số điện thoại bị chặn thất bại',
          }
        }.payload)
      }
    },
      error => {
        this.spinner.hide();
        this.alerts.alertError({
          type: 'error', payload: {
            title: 'Thông báo',
            text: 'Không thể kết nối với máy chủ',
          }
        }.payload)
      }
    );
    
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
