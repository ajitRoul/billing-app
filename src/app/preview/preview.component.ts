import { Component, OnInit, effect } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { jsPDF } from 'jspdf';
import { Location } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { INVOICE_SIGNAL, USER_SIGNAL } from '../signals';
import { IUser } from '../../models/user';
import { IInvoice } from '../../models/invoice';
import { DbService } from '../db/db.service';
import { UtilService } from '../shared/util.service';
import { Router } from '@angular/router';
import { Rupee } from './rupee';



@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [SharedModule, MatGridListModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {
  invoice!: IInvoice;
  invoiceType = 'TAX INVOICE';
  user: IUser = USER_SIGNAL();
  invoiceId :any = '';
  rupee = Rupee;
  displayedColumns = [
    'position',
    'name',
    'unitPrice',
    'quantity',
    'tax',
    'sellingPrice',
  ];

  constructor(
    private _location: Location,
    private readonly dbService: DbService,
    private readonly util: UtilService,
    private readonly router: Router
  ) {
    effect(() => {
      const state = INVOICE_SIGNAL();
      this.invoice = state;
    });
  }

  ngOnInit(): void {
    const state = INVOICE_SIGNAL();
    this.invoice = state;
    this.invoiceType = this.invoice.invoiceType;
    debugger
    this.invoiceId = this.invoice.id ? this.invoice.id : "";
  }

  generateBill() {
    this.generatePDF();
    let service = this.dbService.saveInvoice(this.invoice);
    if (this.invoice.id) {
      service = this.dbService.updateInvoice(this.invoice);
    }
    service.subscribe({
      next: (data) => {
        localStorage.setItem('billNumber', this.invoiceId.toString());
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Error while saving bill', error);
      },
    });
  }

  generatePDF() {
    const doc = new jsPDF({ unit: 'pt' }); 
    const pdfElement = document.getElementById('preview'); 
    doc.addFont("assets/Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");
    if (pdfElement) {
      doc.html(pdfElement, {
        callback: (doc) => {
          const fileName = `${this.invoice.billNumber || 'bill'}.pdf`;
          const folderPath = this.user.folderPath || 'C:\Users';
          const fullPath =  fileName;
          // Check if running in Electron
          if (typeof window.require === 'function') {
            try {
              this.util.savePDF(doc.output('datauristring'), fullPath, folderPath).then((result) => {
                if (result) {
                  console.log('PDF saved successfully');
                }
                else {
                  console.error('Error saving PDF');
                }
              });
            } catch (error) {
              console.error('Error saving PDF:', error);
            }
          } else {
            doc.save(fullPath);
          }

        },
        margin: [20, 20, 20, 20],
        autoPaging: 'text',
        x: 0,
        y: 0,
        width: 550, //target width in the PDF document
        windowWidth: 675, //window width in CSS pixels
      });
    }
  }

  goBack() {
    this._location.back();
  }
}
