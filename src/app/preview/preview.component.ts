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
  invoiceId = 0;

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
    this.invoiceType =this.invoice.invoiceType;
    this.invoiceId = this.invoice.id ? this.invoice.id : this.util.getBillNumber();
  }

  generateBill() {
    this.generatePDF();
    let service = this.dbService.saveInvoice(this.invoice);
    if (this.invoice.id) {
      this.dbService.updateInvoice(this.invoice);
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
    const doc = new jsPDF({ unit: 'pt' }); // create jsPDF object
    const pdfElement = document.getElementById('preview'); // HTML element to be converted to PDF
    if (pdfElement) {
      doc.html(pdfElement, {
        callback: (doc) => {
          doc.save('bill.pdf');
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
