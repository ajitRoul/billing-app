import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../models/user';
import { USER_SIGNAL } from '../signals';
import { DbService } from '../db/db.service';
import { UtilService } from '../shared/util.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  upiQrcode = {
    name: '',
    base64: '',
  };
  logoImage = {
    name: '',
    base64: '',
  };

  signImg = {
    name: '',
    base64: '',
  };

  constructor(
    private readonly dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IUser,
    private readonly dbService: DbService,
    private readonly formBuilder: FormBuilder,
    private readonly util: UtilService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [this.dialogData?.name, [Validators.required]],
      email: [this.dialogData?.email, [Validators.email]],
      phone: [
        this.dialogData?.phone,
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      GSTIN: [this.dialogData?.GSTIN, [Validators.required]],
      companyName: [this.dialogData?.companyName, [Validators.required]],
      address: [this.dialogData?.address, [Validators.required]],
      bankName: [this.dialogData?.bankName, [Validators.required]],
      accountNo: [this.dialogData?.accountNo, [Validators.required]],
      ifscCode: [this.dialogData?.ifscCode, [Validators.required]],
      branchName: [this.dialogData?.branchName, [Validators.required]],
      upiId: [this.dialogData?.upiId, [Validators.required]],
      folderPath: [this.dialogData?.folderPath, [Validators.required]],
    });
  }

  addCustomer() {
    if (this.userForm.valid) {
      const frmVal = this.userForm.value;
      frmVal.logoImage = this.logoImage.base64;
      frmVal.signImg = this.signImg.base64;
      frmVal.upiQrcode = this.upiQrcode.base64;
      let service = this.dbService.addUser(frmVal);
      if (this.dialogData) {
        const data = { ...this.dialogData, ...frmVal };
        service = this.dbService.updateUser(data);
      }
      service.subscribe({
        next: (result) => {
          USER_SIGNAL.set(result);
          this.dialogRef.close(result);
          console.log('User added successfully', result);
        },
        error: (error) => {
          console.error('Error adding user', error);
        },
      });
    }
  }

  async fileSelect(event: any, cntrlName: string) {
    const file = event.target.files[0];
    const base64File = await this.util.getBase64(file);
    if (cntrlName === 'logoImage') {
      this.logoImage = {
        name: file.name,
        base64: base64File as string,
      };
    } else if (cntrlName === 'signImg') {
      this.signImg = {
        name: file.name,
        base64: base64File as string,
      };
    } else {
      this.upiQrcode = {
        name: file.name,
        base64: base64File as string,
      };
    }
  }

  
}
