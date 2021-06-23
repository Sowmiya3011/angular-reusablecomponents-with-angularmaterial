import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input() parentFormGroup : FormGroup
  @Input() parentFormControl : FormControl
  constructor() { }

  ngOnInit() {
  }

}