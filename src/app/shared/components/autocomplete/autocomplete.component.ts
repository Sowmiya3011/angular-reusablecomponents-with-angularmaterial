import { ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges, } from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { coerceNumberProperty } from "@angular/cdk/coercion";

import { Observable } from "rxjs";
import { Identifiable } from './autocomplete.model';
import { debounceTime } from "rxjs/operators";



function isAutocompleteOption(value: Identifiable): boolean {
  if (!value || typeof value === "string") return false
  return value.id > 0
}

function containsIdValidation(control: AbstractControl): ValidationErrors {
  return isAutocompleteOption(control.value) ? null : { required: true }
}

@Component({
  selector: 'my-auto-complete',
  templateUrl: './autocomplete.component.html',
  styleUrls: [ './autocomplete.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() placeholder: string
  @Input() options: Identifiable[]

  // Inner form control to link input text changes to mat autocomplete
  inputControl = new FormControl("", this.validators)
  searchResults: Observable<any>
  noResults = false
  isSearching = false

  private _lengthToTriggerSearch = 3

  @Input()
  set lengthToTriggerSearch(value: number) {
    this._lengthToTriggerSearch = coerceNumberProperty(value, 0)
  }
  constructor(    @Optional() @Self() private controlDir: NgControl,    private changeDetectorRef: ChangeDetectorRef  ) {    if (this.controlDir) {
      this.controlDir.valueAccessor = this
    }
  }

  ngOnInit() {
    if (this.controlDir) {
      // Set validators for the outer ngControl equals to the inner
      const control = this.controlDir.control
      const validators = control.validator
        ? [control.validator, this.inputControl.validator]
        : this.inputControl.validator
      control.setValidators(validators)
      // Update outer ngControl status
      control.updateValueAndValidity({ emitEvent: false })
    }
  }
  ngOnChanges(changes: SimpleChanges) {    
    if (changes.options) {      
      if (this.isSearching) {        
        this.isSearching = false        
        if (!changes.options.firstChange &&          !changes.options.currentValue.length){          
          this.noResults = true        
          } else {          
            this.noResults = false        
            }      
          }
    }
  }

  writeValue(obj: any): void {
    obj && this.inputControl.setValue(obj)
  }
  registerOnChange(fn: any): void {
    // Pass the value to the outer ngControl if it has an id otherwise pass null
    this.inputControl.valueChanges.pipe(debounceTime(300)).subscribe({      
      next: (value) => {        
        if (typeof value === "string") {          
          if (this.isMinLength(value)) {            
            this.isSearching = true            /**             * Fire change detection to display the searching status option             */            
            this.changeDetectorRef.detectChanges()            
            fn(value.toUpperCase())          
            } else {            
              
              this.isSearching = false            
              this.noResults = false            
              fn(null)          
              }        
            } else {          
          
          fn(value)       
          }      
         },    
      }) 
     }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable()
  }

  onTouched() {}

  displayFn(result: Identifiable): string | undefined {
    return result ? result.labelForAutoComplete : undefined
  }

  isMinLength(value: string) {
    return value.length >= this._lengthToTriggerSearch
  }

  private get validators(): ValidatorFn[] {
    return [Validators.required, containsIdValidation]
  }
}




