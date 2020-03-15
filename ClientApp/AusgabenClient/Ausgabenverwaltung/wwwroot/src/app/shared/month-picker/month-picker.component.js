import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
var moment = _rollupMoment || _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export var MY_FORMATS = {
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
var DatepickerViewsSelection = /** @class */ (function () {
    function DatepickerViewsSelection() {
        this.selYear = new Date().getFullYear();
        this.selMonth = new Date().getMonth();
        this.selYearChanged = new EventEmitter();
        this.selMonthChanged = new EventEmitter();
        this.selectedDate = new FormControl(moment());
        this.events = [];
    }
    DatepickerViewsSelection.prototype.ngOnChanges = function () {
        this.initializeDatePicker();
    };
    DatepickerViewsSelection.prototype.addEvent = function (type, event) {
        this.events.push('${type}: ${event.value}');
    };
    DatepickerViewsSelection.prototype.initializeDatePicker = function () {
        // console.log('selYear:');
        // console.log(this.selYear);
        // console.log('selMonth:');
        // console.log(this.selMonth);
        this.selectedDate.setValue(new Date(this.selYear, this.selMonth - 1, 1));
    };
    DatepickerViewsSelection.prototype.chosenYearHandler = function (normalizedYear) {
        // console.log('chosenYearHandler');
        // console.log(this.selectedDate.value);
        // console.log(normalizedYear.year());
        this.selectedDate.setValue(new Date(normalizedYear.year(), this.selMonth, 1));
        this.selectedYear = normalizedYear.year();
        this.selYearChanged.emit(normalizedYear.year());
    };
    DatepickerViewsSelection.prototype.chosenMonthHandler = function (normalizedMonth, datepicker) {
        console.log('chosenMonthHandler');
        console.log(normalizedMonth.month());
        this.selectedDate.setValue(new Date(this.selectedYear, normalizedMonth.month(), 1));
        this.selMonthChanged.emit(normalizedMonth.month() + 1);
        datepicker.close();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatepickerViewsSelection.prototype, "selYear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatepickerViewsSelection.prototype, "selMonth", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DatepickerViewsSelection.prototype, "selYearChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DatepickerViewsSelection.prototype, "selMonthChanged", void 0);
    DatepickerViewsSelection = __decorate([
        Component({
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
                { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
            ],
        })
    ], DatepickerViewsSelection);
    return DatepickerViewsSelection;
}());
export { DatepickerViewsSelection };
//# sourceMappingURL=month-picker.component.js.map