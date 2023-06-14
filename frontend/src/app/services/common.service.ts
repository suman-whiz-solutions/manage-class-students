import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: 'root' })

  export class CommonService {
  
    constructor( private toastr: ToastrService) { }
        
    copyToClipboard(docId:any) {
        let selBox = document.createElement("textarea");
        selBox.style.position = "fixed";
        selBox.style.left = "0";
        selBox.style.top = "0";
        selBox.style.opacity = "0";
        selBox.value = docId;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand("copy");
        document.body.removeChild(selBox);       
      }

      // Success Toast
      showSuccess() {
        this.toastr.success('Hello world!', 'Toastr fun!');
      }
  // showSuccess(message: string, title: string, toastTimeout = 10000) {
  //   this.toastr.successToastr(message, title, {
  //     position: 'top-center',
  //     animate: 'slideFromTop',
  //     showCloseButton: 'x',
  //     toastTimeout: toastTimeout,
  //     dismiss: 'click'
  //   });
  // }

  // Error Toast
  // showError(message: string, title: string, toastTimeout = 10000) {
  //   this.toastr.errorToastr(message, title, {
  //     position: 'top-center',
  //     animate: 'slideFromTop',
  //     showCloseButton: 'x',
  //     toastTimeout: toastTimeout,
  //     dismiss: 'click'
  //   });
  // }

  // Info Toast
  // showInfo(message: string, title: string) {
  //   this.toastr.infoToastr(message, title, {
  //     position: 'top-center',
  //     animate: 'slideFromTop',
  //     showCloseButton: 'x',
  //     toastTimeout: 10000,
  //     dismiss: 'click'
  //   });
  // }
  }

 

