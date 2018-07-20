import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOption } from 'ng-select';
import {
  PageEvent,
  MatTableDataSource,
  MatSort, MatPaginator,
  MAT_DATE_LOCALE,
  MatDatepicker,
  MAT_CHECKBOX_CLICK_ACTION,
  MatChipInputEvent,
} from '@angular/material';
import { ToasterService } from '../service/toast/toaster.service';
import { DialogService } from '../service/dialog/dialog.service';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../model/appointment.model';
import { DatePipe } from '@angular/common';
import { MedicineService } from '../service/medicine.service';
import { Medicine } from '../model/medicine.model';
import { Medicines } from '../model/medicines.model';
import { Disease } from '../model/disease.model';
import { Record } from '../model/record.model';
import { Observable, Subject, concat } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
  { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' },
    AppointmentService,
    MedicineService],
})
export class ListPatientComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  symptoms = [];
  resultSymptoms = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.symptoms.push({ name: value.trim() });
      this.resultSymptoms.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log(this.symptoms)
  }

  remove(fruit): void {
    const index = this.symptoms.indexOf(fruit);

    if (index >= 0) {
      this.symptoms.splice(index, 1);
      this.resultSymptoms.splice(index, 1);
    }
  }


  //---------------------------------------------------------
  myOptions: Array<IOption> = [];
  selectedDisease = [];

  asyncObservable() {
    return new Observable(observer => {
      setInterval(() => {
        observer.next("Hi");
      }, 1000)
    })
  }
  // --------------------------------------------------------
  genders = ["Nam", "Nữ", "Khác"]
  genderObj;
  yob = "";
  recordSymptoms = [];
  records: Record[] = [];
  diseases: Disease[] = [];
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
  appID = 0;
  phoneNumber = "";
  address = "";
  remind = "";
  patID = 0;
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
    private spinner: NgxSpinnerService
  ) {
  }
  ngOnInit() {
    // this.asyncObservable().subscribe(data=>{console.log(data);}) 
    this.date;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    var d = this.currentDate;

    this.onGetList(d);
    this.onGetMedicine();
    this.onGetDisease();
  }
  onAddMedicine() {
    this.listMedicine.push(new Medicines(0, "", "", 1, ""));
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  inputUnit(id: any, position: number) {
    var index = this.medicines.findIndex(med => med.medicineID == id);
    if (index >= 0 && index < this.medicines.length) {
      this.listMedicine[position].unitName = this.medicines[index].unitName;
      this.listMedicine[position].medicineID = this.medicines[index].medicineID;
      this.listMedicine[position].description = this.medicines[index].defaultDescription;
      this.listMedicine[position].quantity = this.medicines[index].defaultQuantity;
    }


    // console.log(this.medicines[index])
  }
  onGetDisease() {
    this.medicineService
      .getDiseases()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        var list: Array<IOption> = [];
        for (var i in tmp.value) {
          var dis = tmp.value[i];
          var result = new Disease(dis.diseaseID, dis.diseaseName, dis.isActive);
          list.push({
            label: dis.diseaseName,
            value: dis.diseaseID
          });
          this.diseases.push(result);
        }
        this.myOptions = list;


      })
  }
  onGetMedicine() {
    this.medicineService
      .getMedicines()
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var med = tmp.value[i];
          var result = new Medicine(med.medicineID, med.medicineName, med.unitName, med.isActive, med.defaultDescription, med.defaultQuantity)
          this.medicines.push(result);

        }
      })
  }
  onGetRecord(patientID) {
    while (this.records.length > 0) {
      this.records.pop();
    }
    this.medicineService
      .getMedicalRecord(patientID)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        for (var i in tmp.value) {
          var re = tmp.value[i];
          var result = new Record(re.appointmentID, re.appointmentTime, re.no, re.status, re.reminding, re.medicalMedicines, re.medicalDisease, "", re.symptoms, "");
          for (var index in result.disease) {
            var item = result.disease[index];

            result.presentDiseases += (parseInt(index) != result.disease.length - 1) ? item.diseaseName + ", " : item.diseaseName;
            result.presentSymptoms = result.symptoms.toString();
          }

          this.records.push(result);
          this.records.sort((pre, post) => { return new Date(post.appointmentTime).getTime() - new Date(pre.appointmentTime).getTime() })

        }
      })
  }
  onGetList(date: string) {
    this.spinner.show();
    this.appointmentService
      .getAppointments(this.username, date)
      .subscribe((response) => {
        this.spinner.hide();
        var tmp = JSON.parse(JSON.stringify(response));
        var isCurrent = false;
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Appointment(app.appointmentID, app.patientID, app.appointmentTime, app.no, app.currentTime, app.status, false, app.fullName, app.phoneNumber, app.address, app.gender, app.yob, app.isBlock, false);
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
          this.spinner.hide();
          this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
        })
  }
  onSelect(appID: number, choose: number) {
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId == appID);
    if (choose == 1) {
      choose = 0;
    } else choose = 1;
    this.ELEMENT_DATA[index].status = choose;
    this.appointmentService
      .postCheckStatus(this.username, appID, choose)
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
  CheckAttendanceForCreateRecord(appID: number, choose: number) {
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId == appID);
    if (choose == 0) {
      choose = 1;
    }
    this.ELEMENT_DATA[index].status = choose;
    this.appointmentService
      .postCheckStatus(this.username, appID, choose)
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
  onPushPopupRecord(fullName: string, appID: number, phoneNumber: string) {
    this.remind = ""
    this.fullName = fullName;
    this.appID = appID;
    this.phoneNumber = phoneNumber
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId === this.appID);
    while (this.listMedicine.length > 0) {
      this.listMedicine.pop();

    }
    while (this.selectedDisease.length > 0) {
      this.selectedDisease = [];
    }
    while (this.resultSymptoms.length > 0) {
      this.resultSymptoms.pop();
      this.symptoms.pop();
    }
  }
  onPushPopupDetail(appID: number) {
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId === appID);
    this.appID = appID;
    this.patID = this.ELEMENT_DATA[index].patientID;
    this.fullName = this.ELEMENT_DATA[index].patientName;
    this.phoneNumber = this.ELEMENT_DATA[index].phoneNumber;
    this.address = this.ELEMENT_DATA[index].address;
    if (this.ELEMENT_DATA[index].gender == "1") {
      this.genderObj = "Nam"
    } else if (this.ELEMENT_DATA[index].gender == "2") {
      this.genderObj = "Nữ"
    } else {
      this.genderObj = "Khác"
    }

    var format = this.pipe.transform(this.ELEMENT_DATA[index].yob, 'yyyy-MM-dd')

    this.yob = format
    this.onGetRecord(this.ELEMENT_DATA[index].patientID);
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
  getIndexRecord(indexRecord) {
    // while (this.listMedicine.length > 0) {
    //   this.listMedicine.pop();
    // }
    this.listMedicine = this.records[indexRecord].medicines
    this.remind = this.records[indexRecord].remind;
    this.recordSymptoms = this.records[indexRecord].symptoms;

  }
  onSaveRecord() {

    for (let i = 0; i < this.listMedicine.length; i++) {
      if (this.listMedicine[i].medicineName == "") {
        this.toastService.Error("Vui lòng nhập tên thuốc")
        return;
      }
    }
    const index = this.ELEMENT_DATA.findIndex(app => app.appointmentId === this.appID);
    this.CheckAttendanceForCreateRecord(this.appID, this.ELEMENT_DATA[index].status)
    this.medicineService
      .postMedicalRecord(this.appID, this.remind, "", this.listMedicine, this.selectedDisease, this.resultSymptoms)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {

          this.toastService.Success("Tạo bệnh án thành công")
        }
        else {
          this.toastService.Error(tmp.error)
        }
      },
        error => {
          this.dialog.openDialog("Chú ý", "không thể kết nối mạng");
        }
      );

  }
  onRemoveMedicine(nameMedicine: string) {
    const index = this.listMedicine.findIndex(med => med.medicineName === nameMedicine);
    this.listMedicine.splice(index, 1);
  }
  onUpdateDetail(patID) {
    const index = this.ELEMENT_DATA.findIndex(pat => pat.patientID === patID);

    if (this.genderObj == "Nam") {
      this.ELEMENT_DATA[index].gender = "1";
    } else if (this.genderObj == "Nữ") {
      this.ELEMENT_DATA[index].gender = "2";
    } else {
      this.ELEMENT_DATA[index].gender = "0";
    }
    this.appointmentService
      .postUpdatePatient(this.ELEMENT_DATA[index].patientID,
        this.phoneNumber,
        this.fullName,
        this.address,
        new Date(this.yob),
        this.ELEMENT_DATA[index].gender)
      .subscribe((response) => {

        var tmp = JSON.parse(JSON.stringify(response));
        console.log(tmp)
        if (tmp.status == true) {
          this.ELEMENT_DATA[index].patientName = this.fullName
          this.ELEMENT_DATA[index].phoneNumber = this.phoneNumber
          this.ELEMENT_DATA[index].address = this.address
          this.ELEMENT_DATA[index].yob = new Date(this.yob)
          this.onRefreshData();
          this.toastService.Success("Update Patient Successfully")
        }
        else {
          this.toastService.Error(tmp.error)
          console.log("loi update detail")
        }
      },
        error => {
          this.dialog.openDialog("Attention", "Cannot connect network!");
        }
      );
    this.dataSource.filter = "";
  }
  onRefreshData() {
    while (this.ELEMENT_DATA.length > 0) {
      this.ELEMENT_DATA.pop();
    }
    var pipe = new DatePipe('en-US');
    var format = pipe.transform(this.selectedDate, 'yyyy/M/dd');
    this.onGetList(format);
    this.onGetMedicine();
    this.onGetDisease();
  }
  resetData() {
    this.onRefreshData();
  }
}

