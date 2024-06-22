import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getBillNumber() {
    const billNo = localStorage.getItem('billNumber');
    if(billNo) {
      return parseInt(billNo) + 1;
    } else {
      return 1;
    }
  }

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Str = reader.result;
        if (typeof base64Str === "string") {
          resolve(base64Str);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }
}
