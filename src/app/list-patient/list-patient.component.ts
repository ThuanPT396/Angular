import { Component, OnInit, ViewChild, ViewEncapsulation, LOCALE_ID, ElementRef } from '@angular/core';
import { PageEvent, MatTableDataSource, MatSort, MatPaginator, MAT_DATE_LOCALE, MatDatepicker, MAT_CHECKBOX_CLICK_ACTION, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../model/appointment.model';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MedicineService } from '../service/medicine.service';
import { Medicine } from '../model/medicine.model';
import { Record } from '../model/record.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ja-JP' }, { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }, AppointmentService, MedicineService],
})
export class ListPatientComponent implements OnInit {
  // multiselect
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef;
  // -------------

  records: Record[] = [];
  medicines: Medicine[] = [];
  disease = [];
  ELEMENT_DATA: Appointment[] = [];
  pipe = new DatePipe('en-US');
  d = new Date();
  day = this.d.getDate();
  month = this.d.getMonth() + 1;
  year = this.d.getFullYear();
  currentDate = this.year + "/" + this.month + "/" + this.day;
  date = new FormControl(new Date());
  fullName = "";
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
  this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  ngOnInit() {
    this.date;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    var d = this.currentDate;
    this.onGetList(d);
    this.onGetMedicine();
  }
  onAddMedicine() {
    this.records.push(new Record("", 0, ""));
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  inputUnit(name: string, position: number) {
    const index = this.medicines.findIndex(med => med.medicineName === name);

    this.records[position].unitName = this.medicines[index].unitName;
    console.log(this.records[position].medicineName)
    console.log(this.records[position].unitName)
    console.log(this.records[position].quantity)
    console.log(this.records)
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
  onPushPopupRecord(fullName: string) {
    this.fullName = fullName;
  }
  onBanPhoneNumber(phoneNumber: string, BisBlock: boolean) {
    var test = BisBlock ? 0 : 1;
    const index = this.ELEMENT_DATA.findIndex(app => app.phoneNumber === phoneNumber);
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].phoneNumber === phoneNumber) {
        this.ELEMENT_DATA[i].BisBlock = !BisBlock;
        this.ELEMENT_DATA[i].isBlock = test;
      
      }
      console.log(this.ELEMENT_DATA[i]);
    }
    console.log(test)

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

  // multiselect
  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}



