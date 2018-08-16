import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_LOCALE, PageEvent, MatTableDataSource, MatPaginator, MatSort, MatTabChangeEvent } from '@angular/material';
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
  // myControl = new FormControl();
  // filteredOptions: Observable<string[]>;
  // -------------------
  valueFilter="";
  ELEMENT_DATA: PhoneNumber[] = [];
  username = localStorage.getItem('username')
  pageEvent: PageEvent;
  selectedRowIndex;
  selectTabs = 0;
  displayedColumns = ['position','fullName', 'phoneNumber', 'function'];
  dataSource1 = new MatTableDataSource<PhoneNumber>(this.ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<PhoneNumber>(this.ELEMENT_DATA);
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;
  // @ViewChild(MatSort) sort2: MatSort;
  @ViewChild('table2', {read: MatSort}) sort2: MatSort;
  constructor(private appointmentService: AppointmentService,
    private toastService: ToasterService,
    private spinner: NgxSpinnerService,
    private alerts: NgxAlertsService, ) { }
  ngOnInit() {
    
    this.dataSource1.sort = this.sort1;
    this.dataSource2.sort = this.sort2;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator2;
    this.spinner.show();
    this.onGetListBlock()
  }
  // private _filter(value: string): any {
  //   const filterValue = value.toLowerCase();
  //   // return this.options.filter(option => option.toLowerCase().includes(filterValue));
  //   this.dataSource.filter = filterValue;
  //   if (this.dataSource.paginator) {
  //     return this.dataSource.paginator.firstPage();
  //   }
  // }
  onGetListBlock() {

    this.ELEMENT_DATA = []
    this.appointmentService
      .getPhoneNumber(this.username)
      .subscribe(response => {
        this.spinner.hide();
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new PhoneNumber(app.names,app.phoneNumber, app.isBlock);
          if (result.isBlock == false && this.selectTabs == 0) {
            this.ELEMENT_DATA.push(result);
          } else if (result.isBlock == true && this.selectTabs == 1) {
            this.ELEMENT_DATA.push(result);
          }
          // this.ELEMENT_DATA.push(result);
        }
        if (this.selectTabs == 0) {
          this.dataSource1.data = this.ELEMENT_DATA;
        } else if (this.selectTabs == 1) {
          this.dataSource2.data = this.ELEMENT_DATA;
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
        })
  }
  // onRemovePhoneNumber(phoneNumber: string) {
  //   this.spinner.show();
  //   const index = this.ELEMENT_DATA.findIndex(user => user.phoneNumber === phoneNumber);
  //   this.appointmentService
  //     .postBlockNumber(this.username, phoneNumber, 0)
  //     .subscribe((response) => {
  //       this.spinner.hide();
  //       var tmp = JSON.parse(JSON.stringify(response));
  //       if (tmp.status == true) {
  //         this.ELEMENT_DATA.splice(index, 1);
  //         this.toastService.Success("Xóa chặn chặn thành công")
  //         this.dataSource.filter = "";
  //       }
  //       else {
  //         this.alerts.alertError({
  //           type: 'error', payload: {
  //             title: 'Thông báo',
  //             text: 'Xóa Số điện thoại bị chặn thất bại',
  //           }
  //         }.payload)
  //       }
  //     },
  //       error => {
  //         this.spinner.hide();
  //         this.alerts.alertError({
  //           type: 'error', payload: {
  //             title: 'Thông báo',
  //             text: 'Không thể kết nối với máy chủ',
  //           }
  //         }.payload)
  //       }
  //     );


  // }
  onBanPhoneNumber(phoneNumber: string, isBlock: boolean) {
    const index = this.ELEMENT_DATA.findIndex(app => app.phoneNumber === phoneNumber);
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].phoneNumber === phoneNumber) {
        this.ELEMENT_DATA[i].isBlock = !isBlock;
      }
    }
    this.appointmentService
      .postBlockNumber(this.username, phoneNumber, !isBlock)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Đổi trạng thái chặn thành công")
          this.onGetListBlock();
        }
        else {
          this.alerts.alertError({ type: 'error', payload: { title: 'Thông báo', text: 'Đổi trạng thái chặn thất bại', } }.payload)


        }
      },
        error => {
          this.alerts.alertError({ type: 'error', payload: { title: 'Thông báo', text: 'Không thể kết nối với máy chủ', } }.payload)
        }
      );
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    if (this.selectTabs==0) {
      this.dataSource1.filter = filterValue;
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
    }else if(this.selectTabs==1){
      this.dataSource2.filter = filterValue;
      if (this.dataSource2.paginator) {
        this.dataSource2.paginator.firstPage();
      }
    }
    
  }
  selectIndexTab(event) {
    // if (event.index == 0) {
    //   this.selectTabs = 0
    //   this.onGetListBlock();
    //   // !this.dataSource1.paginator ? this.dataSource1.paginator = this.paginator1 : null;
    // } else if (event.index == 1) {
    //   this.selectTabs = 1
    //   this.onGetListBlock();
    //   // !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
    // }
    console.log(event.index)
    setTimeout(() => {
      switch (event.index) {
        case 0:
          this.selectTabs = 0
          this.onGetListBlock();
          !this.dataSource1.paginator ? this.dataSource1.paginator = this.paginator1 : null;
          !this.dataSource1.sort ? this.dataSource1.sort = this.sort1 : null;
          this.valueFilter="";
          this.applyFilter(this.valueFilter)
          break;
        case 1:
          this.selectTabs = 1
          this.onGetListBlock();
          !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
          !this.dataSource2.sort ? this.dataSource2.sort = this.sort2 : null;
          this.valueFilter="";
          this.applyFilter(this.valueFilter)
      }
    });
  }
}
