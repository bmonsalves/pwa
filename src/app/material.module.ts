import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatSnackBarModule,
  MatCardModule
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatSnackBarModule,
  MatCardModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
