import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_LOCALE, PageEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppointmentService } from '../../service/appointment.service';
import { PhoneNumber } from '../../model/phoneNumber.model';
import { ToasterService } from '../../service/toast/toaster.service';
import { DialogService } from '../../service/dialog/dialog.service';

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
  constructor(private appointmentService: AppointmentService, private toastService: ToasterService, private dialog: DialogService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.appointmentService
    .getPhoneNumberBlock(this.username)
    .subscribe(response =>{
      var tmp = JSON.parse(JSON.stringify(response));
      var isCurrent = false;
      for (var i in tmp.value) {
        var app = tmp.value[i];
        var result = new PhoneNumber(app.blockID,app.clinicUsername,app.PhoneNumber,app.isBlock);
        this.ELEMENT_DATA.push(result);
      }
      this.dataSource.data = this.ELEMENT_DATA;
    },
      error => {
        this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
      } )

  }
  onRemovePhoneNumber(phoneNumber:string){
    const index = this.ELEMENT_DATA.findIndex(user => user.phoneNumber === phoneNumber);
    this.appointmentService
    .postBlockNumber(this.username, phoneNumber, 0)
    .subscribe((response) => {
      var tmp = JSON.parse(JSON.stringify(response));
      if (tmp.status == true) {
        this.toastService.Success("Xóa chặn chặn thành công")
      }
      else {
        this.toastService.Error("Xóa chặn thất bại")
      }
    },
      error => {
        this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
      }
    );
    this.ELEMENT_DATA.splice(index, 1);
    this.dataSource.filter = "";
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
