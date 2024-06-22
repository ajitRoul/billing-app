import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';



export const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatDividerModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatExpansionModule,
  MatDialogModule,
  MatCheckboxModule,
  CommonModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatMenuModule,
  MatListModule
]

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: materialModules,
 
})
export class SharedModule { }
