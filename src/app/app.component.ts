import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { of } from "rxjs";
import { map, startWith, delay, switchMap } from "rxjs/operators";


import { products } from "./data"

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  label = "Submit"

  functioncall(event: any) {
    console.log('functioncall', event);
  }

  //Radio Component Code 
  controlsFormGroup: FormGroup;
  radioexample: FormControl= new FormControl;
  constructor(private fb: FormBuilder){}
  ngOnInit(){
    this.controlsFormGroup=this.fb.group({
      radioexample: this.radioexample
    })
    this.controlsFormGroup.get('radioexample').valueChanges.subscribe(value => console.log(value));
  }
  save(): void{
    let radioValue = this.controlsFormGroup.get('radioexample').value;
    console.log(radioValue)
  }

  //Custom-Input Code 

  external : string;
  labelForInput = "Enter your Name"

  //AutocompleteComponent Code

  form = new FormGroup({
    product: new FormControl(),
    
  })

  pdts$ = this.form.get("product").valueChanges.pipe(
    startWith(null),
    switchMap((name) => {
      if (typeof name === "string") {
        return of(products).pipe(
          delay(1000),
          map((response) =>
            response.filter((p) => p.labelForAutoComplete.toUpperCase().includes(name))
          )
        )
      }
      return of([])
    })
  )
  submit() {
    console.log(this.form.value)
  }
}
