import {Component, Output, EventEmitter, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM.YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DatepickerViewsSelection {

  @Input() selYear=new Date().getFullYear();
  @Input() selMonth=new Date().getMonth();
  @Output() selYearChanged = new EventEmitter<number>();
  @Output() selMonthChanged = new EventEmitter<number>();

  selectedDate = new FormControl(moment());
  selectedYear: number;
  
  events: string[] = [];

  ngOnChanges(){
    this.initializeDatePicker();
  }
  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push('${type}: ${event.value}');
  }
  
 
  initializeDatePicker(){
    // console.log('selYear:');
    // console.log(this.selYear);
    // console.log('selMonth:');
    // console.log(this.selMonth);
    this.selectedDate.setValue(new Date(this.selYear, this.selMonth-1, 1));
  
  }
  chosenYearHandler(normalizedYear: Moment) {
    // console.log('chosenYearHandler');
    // console.log(this.selectedDate.value);
    // console.log(normalizedYear.year());
    this.selectedDate.setValue(new Date(normalizedYear.year(), this.selMonth, 1));
    this.selectedYear=normalizedYear.year();
    this.selYearChanged.emit(normalizedYear.year());
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    console.log('chosenMonthHandler');
    console.log(normalizedMonth.month());
    this.selectedDate.setValue(new Date(this.selectedYear, normalizedMonth.month(), 1));
    this.selMonthChanged.emit(normalizedMonth.month()+1);
    datepicker.close();
  }

 
}