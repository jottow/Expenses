import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { AusgabenService } from 'src/app/shared/ausgaben.service';
import { AppComponent } from 'src/app/app.component';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import 'rxjs/add/observable/of';
import { Ausgaben } from 'src/app/shared/ausgaben.model';
var AusgabenListComponent = /** @class */ (function () {
    function AusgabenListComponent(service, baseComponent) {
        this.service = service;
        this.baseComponent = baseComponent;
        this.dataSource = new MatTableDataSource();
        this.displayedColumns = ['AusgabenTyp', 'Betrag', 'Datum', 'User', 'Shop', 'Bemerkung', 'Delete'];
        // sends the marked list entry to the parent
        this.ausgabeEdit = new EventEmitter();
        this.selYearChanged = new EventEmitter();
        this.selMonthChanged = new EventEmitter();
        this.resourcesLoaded = false;
    }
    AusgabenListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('list: ngOnOnit');
        if (!this.selYear) {
            this.selYear = this.baseComponent.selectedYear;
            this.selMonth = this.baseComponent.selectedMonth;
        }
        this.baseComponent.allAusgaben.subscribe(function (data) {
            _this.dataSource.data = data;
        });
        this.dataSource.paginator = this.paginator;
        setTimeout(function () {
            _this.dataSource.sort = _this.sort;
        });
        this.resourcesLoaded = true;
    };
    AusgabenListComponent.prototype.onDelete = function (Id) {
        var _this = this;
        if (confirm('Eintrag löschen?')) {
            this.resourcesLoaded = false;
            this.service.deleteAusgabe(Id)
                .subscribe(function (res) {
                console.log('list: ngOnDelete');
                _this.baseComponent.allAusgaben.subscribe(function (data) {
                    _this.dataSource.data = data;
                    _this.resourcesLoaded = true;
                    _this.loadAusgabeToEdit();
                });
            }, 
            //this.toastr.warning('Deleted successfully', 'Payment Detail Register');},
            function (err) {
                console.log(err);
            });
        }
    };
    AusgabenListComponent.prototype.refreshResults = function (selectedYear, selectedMonth) {
        var _this = this;
        console.log('list: refreshResults');
        if (!selectedYear) {
            console.log('kein selectedYear:');
            console.log(this.baseComponent.selectedYear);
            console.log(this.baseComponent.selectedMonth);
            selectedYear = this.baseComponent.selectedYear;
            selectedMonth = this.baseComponent.selectedMonth;
        }
        else {
            this.baseComponent.selectedYear = selectedYear;
            this.baseComponent.selectedMonth = selectedMonth;
        }
        console.log(selectedYear);
        console.log(selectedMonth);
        this.service.getAllAusgaben(selectedYear, selectedMonth).subscribe(function (data) {
            _this.dataSource.data = data;
        });
        this.selYearChanged.emit(selectedYear);
        this.selMonthChanged.emit(selectedMonth);
        this.resourcesLoaded = true;
    };
    // Filter: event keyup (Eingabe in Filter)
    AusgabenListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    // Summenzeile: mat-footer-cell
    AusgabenListComponent.prototype.getTotalCost = function () {
        return this.dataSource.filteredData.map(function (d) { return d.Betrag; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    // Aufruf, wenn Zeile in Aufgabenliste ausgewählt
    AusgabenListComponent.prototype.loadAusgabeToEdit = function (ausgabe) {
        var _this = this;
        if (ausgabe) {
            console.log('ausgewählt:' + ausgabe.Id);
            this.service.getAusgabeById(ausgabe.Id).subscribe(function (ausgabe) {
                _this.message = null;
            });
        }
        else {
            console.log('Initialize after deletion');
            var ausgabeInit = new Ausgaben();
            ausgabeInit.Id = 0;
            ausgabeInit.AusgabenTypId = 1;
            ausgabeInit.Datum = new Date();
            ausgabeInit.Betrag = 0;
            ausgabeInit.ShopId = 1;
            ausgabeInit.UserId = 1;
            ausgabeInit.Bemerkung = '';
            ausgabe = ausgabeInit;
        }
        this.ausgabeEdit.emit(ausgabe);
    };
    AusgabenListComponent.prototype.getYearUpdate = function (selected) {
        console.log('gewähltes Jahr:' + selected);
        this.selYear = selected;
        this.refreshResults(selected, this.selMonth);
    };
    AusgabenListComponent.prototype.getMonthUpdate = function (selected) {
        console.log('gewählter Monat:' + selected);
        this.selMonth = selected;
        this.refreshResults(this.selYear, selected);
    };
    __decorate([
        ViewChild(MatTable),
        __metadata("design:type", MatTable)
    ], AusgabenListComponent.prototype, "table", void 0);
    __decorate([
        ViewChild(MatPaginator),
        __metadata("design:type", MatPaginator)
    ], AusgabenListComponent.prototype, "paginator", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], AusgabenListComponent.prototype, "sort", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenListComponent.prototype, "ausgabeEdit", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenListComponent.prototype, "selYearChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenListComponent.prototype, "selMonthChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AusgabenListComponent.prototype, "selYear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AusgabenListComponent.prototype, "selMonth", void 0);
    AusgabenListComponent = __decorate([
        Component({
            selector: 'app-ausgabenlist',
            templateUrl: './ausgaben-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [AusgabenService,
            AppComponent])
    ], AusgabenListComponent);
    return AusgabenListComponent;
}());
export { AusgabenListComponent };
//# sourceMappingURL=ausgaben-list.component.js.map