import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  PageEvent,
  MatTableDataSource,
  MatSort, MatPaginator,
  MAT_DATE_LOCALE,
  MatDatepicker,
  MAT_CHECKBOX_CLICK_ACTION,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../model/appointment.model';
import { DatePipe } from '@angular/common';
import { MedicineService } from '../service/medicine.service';
import { Medicine } from '../model/medicine.model';
import { Medicines } from '../model/medicines.model';
import { Disease } from '../model/disease.model';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ja-JP' }, { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }, AppointmentService, MedicineService],
})
export class ListPatientComponent implements OnInit {

  // --------------------------------------------------------
  diseases: Disease[]=[];
  diseaseObj;
  listMedicine: Medicines[] = [];
  medicines: Medicine[] = [];
  ELEMENT_DATA: Appointment[] = [];
  pipe = new DatePipe('en-US');
  d = new Date();
  day = this.d.getDate();
  month = this.d.getMonth() + 1;
  year = this.d.getFullYear();
  currentDate = this.year + "/" + this.month + "/" + this.day;
  date = new FormControl(new Date());
  fullName = "";
  appID=0;
  remind="";
  username = localStorage.getItem('username')
  clinicName = localStorage.getItem('clinicName')
  disabled = false;
  disabledCheckBox = false;
  selectedDate = new Date();
  // MatPaginator Outputs
  pageEvent: PageEvent;
  selectedRowIndex;

  displayedColumns = ['position', 'username', 'phoneNumber', 'workingHour', 'attendance', 'block', 'medical', 'detail'];
  dataSource = new MatTableDataSource<Appointment>(this.ELEMENT_DATA);

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private appointmentService: AppointmentService,
    private medicineService: MedicineService,
    private toastService: ToasterService,
    private dialog: DialogService,
  ) {
  }
  ngOnInit() {
    this.date;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    var d = this.currentDate;
    this.onGetList(d);
    this.onGetMedicine();
    this.onGetDisease();

  }
  onAddMedicine() {
    this.listMedicine.push(new Medicines(0,"","", 0, ""));
    
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  inputUnit(name: string, position: number) {
    const index = this.medicines.findIndex(med => med.medicineName === name);
    this.listMedicine[position].unitName = this.medicines[index].unitName;
    this.listMedicine[position].medicineID = this.medicines[index].medicineID;
  }
  onGetDisease() {
    this.medicineService
      .getDiseases()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var dis = tmp.value[i];
          var result = new Disease(dis.diseasesID, dis.diseasesName, dis.isActive)
          this.diseases.push(result);
        }
      })
  }
  onGetMedicine() {
    this.medicineService
      .getMedicines()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var med = tmp.value[i];
          var result = new Medicine(med.medicineID, med.medicineName, med.unitName, med.isActive)
          this.medicines.push(result);
        }
      })
  }
  deadline(id: number) {
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId === id);
    var appTime = this.ELEMENT_DATA[index].appointmentTime
    var curTime = this.ELEMENT_DATA[index].currentTime
    if (appTime == curTime) {

    }
  };
  onGetList(date: string) {
    this.appointmentService
      .getAppointments(this.username, date)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        var isCurrent = false;
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Appointment(app.appointmentID, app.appointmentTime, app.no, app.currentTime, app.status, false, app.fullName, app.phoneNumber, app.address, app.yob, app.isBlock, false);
          if (!isCurrent && result.appointmentTime >= result.currentTime) {
            isCurrent = true;
            result.isCurrentAppointment = true;
          }
          if (result.isBlock === 1) {
            result.BisBlock = true
          }
          this.ELEMENT_DATA.push(result);
        }
        this.dataSource.data = this.ELEMENT_DATA;
      },
        error => {
          this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
        })
  }
  onSelect(appID: number, choose: string) {
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId == appID);
    if (this.ELEMENT_DATA[index].currentTime < this.ELEMENT_DATA[index].appointmentTime) {
      this.disabledCheckBox = true;
      return;
    }
    this.appointmentService
      .postCheckStatus(this.username, appID, !choose)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Đổi trạng thái thành công")
        }
        else {
          this.toastService.Error("Đổi trạng thái thất bại")
        }
      },
        error => {
          this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
        }
      );
  }
  onGetDate(dateValue: string) {
    var format = this.pipe.transform(dateValue, 'yyyy/M/d')
    this.selectedDate = new Date(dateValue);
    // var d = this.date = dateValue;
    while (this.ELEMENT_DATA.length > 0) {
      this.ELEMENT_DATA.pop();
    }
    if (format != this.currentDate) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
    this.onGetList(format);

  }
  onPushPopupRecord(fullName: string,appID:number) {
    this.fullName = fullName;
    this.appID= appID;
  }
  onBanPhoneNumber(phoneNumber: string, BisBlock: boolean) {
    var test = BisBlock ? 0 : 1;
    const index = this.ELEMENT_DATA.findIndex(app => app.phoneNumber === phoneNumber);
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].phoneNumber === phoneNumber) {
        this.ELEMENT_DATA[i].BisBlock = !BisBlock;
        this.ELEMENT_DATA[i].isBlock = test;
      }
    }

    this.appointmentService
      .postBlockNumber(this.username, phoneNumber, test)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.toastService.Success("Đổi trạng thái chặn thành công")
        }
        else {
          this.toastService.Error("Đổi trạng thái chặn thất bại")
        }
      },
        error => {
          this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
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

  onSaveRecord(){
    console.log(this.appID)
    console.log(this.remind)
    console.log(this.listMedicine)
    console.log(this.diseaseObj.diseasesID)
    var disID=this.diseaseObj.diseasesID
    this.medicineService
    .postMedicalRecord(this.appID,this.remind,"",this.listMedicine,disID)
    .subscribe((response) => {
      var tmp = JSON.parse(JSON.stringify(response));
      if (tmp.status == true) {
        this.toastService.Success("Lưu bệnh án thành công")
      }
      else {
        console.log(tmp.error)
        this.toastService.Error("Lưu bệnh án thất bại")
      }
    },
      error => {
        this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
      }
    );
  }

}

