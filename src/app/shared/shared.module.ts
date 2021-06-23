import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { RadioComponent } from './components/radio/radio.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import {  MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatOptionModule
  ],
  declarations: [
    ButtonComponent,
    RadioComponent,
    CustomInputComponent,
    AutocompleteComponent
  ],
  exports : [
    ButtonComponent,
    RadioComponent,
    CustomInputComponent,
    AutocompleteComponent
  ]
})
export class SharedModule { }