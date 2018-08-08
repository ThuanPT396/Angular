import { Injectable } from '@angular/core';
declare var toastr: any
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() {
    this.setting();
  }
  Success(title: string, message?: string) {
    toastr.success(title, message);
  }
  Warning(title: string, message?: string) {
    toastr.warning(title, message);
  }
  Error(title: string, message?: string) {
    toastr.error(title, message);
  }
  Info(message?: string) {
    toastr.info(message);
  }

  setting() {
    // toastr.remove()
    // toastr.clear()

    toastr.options = {
      "closeButton": true,
      // "debug": false,
      // "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": true,
      "autoDismiss": true,
      "maxOpened": 1,
      // "onclick": null,
      // "showDuration": "200",
      // "hideDuration": "1000",
      "timeOut": "4000",
      "extendedTimeOut": "2000",
      // "showEasing": "swing",
      // "hideEasing": "linear",
      // "showMethod": "fadeIn",
      // "hideMethod": "fadeOut"
    }
  }
}
