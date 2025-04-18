import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from './loader/loader.component';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  dialogRef!: any;
  private ipc: IpcRenderer | undefined;
  private path: any;


  constructor(private dialog: MatDialog) {
    // Check if running in Electron
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
        this.path = window.require('path');
      } catch (error) {
        console.error('Error loading IPC:', error);
      }
    }
   }

  getBillNumber() {
    const billNo = localStorage.getItem('billNumber');
    if (billNo) {
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

  showLoader() {

    this.dialogRef = this.dialog.open(LoaderComponent, {
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'custom-loader',
      height: '100vh',
      width: '100vw',
      
      position: {
        top: '0',
        left: '30%',
      },
    });
  }

  hideLoader() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public savePDF(pdfData: any, filename: string, folderPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.ipc) {
        const normalizedPath = this.path.normalize(folderPath);

        this.ipc.send('save-pdf', { data: pdfData, filename, folderPath: normalizedPath });
        
        this.ipc.once('pdf-saved', (event, success) => {
          resolve(success);
        });

        this.ipc.once('pdf-save-error', (event, error) => {
          reject(error);
        });
      } else {
        reject('IPC not available');
      }
    });
  }

}
