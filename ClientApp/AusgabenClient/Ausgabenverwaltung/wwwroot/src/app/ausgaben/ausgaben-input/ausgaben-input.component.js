import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { AusgabenService } from 'src/app/shared/ausgaben.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Ausgaben } from 'src/app/shared/ausgaben.model';
import { AppComponent } from 'src/app/app.component';
import { AusgabenListComponent } from '../ausgaben-list/ausgaben-list.component';
var AusgabenInputComponent = /** @class */ (function () {
    function AusgabenInputComponent(formbuider, service, appComponent) {
        this.formbuider = formbuider;
        this.service = service;
        this.appComponent = appComponent;
        this.resourcesLoaded = false;
        // Standard values for base data in dropdowns
        this.defaultAusgabenTyp = 1;
        this.defaultUser = 1;
        this.defaultShop = 1;
    }
    AusgabenInputComponent.prototype.ngOnInit = function () {
        // Initialisieren der Eingabefelder
        console.log('input:ngOnInit');
        this.currentDate = new Date();
        console.log('currentDate (ngOnInit):');
        console.log(this.currentDate);
        this.ausgabenTypen = this.appComponent.allAusgabenTypen;
        this.users = this.appComponent.allUsers;
        this.shops = this.appComponent.allShops;
        this.ausgabenInputForm = this.formbuider.group({
            Id: [0],
            AusgabenTypId: [this.defaultAusgabenTyp, [Validators.required]],
            UserId: [this.defaultUser, [Validators.required]],
            ShopId: [this.defaultShop, [Validators.required]],
            Datum: [this.currentDate, [Validators.required]],
            Betrag: ['', [Validators.required, Validators.min(0.01)]],
            Bemerkung: ['']
        });
        this.resourcesLoaded = true;
    };
    // occurs, when table entry in ausgabeList has been clicked
    AusgabenInputComponent.prototype.ngOnChanges = function () {
        this.resourcesLoaded = false;
        console.log('input:ngOnChanges');
        if (this.ausgabeEdit) {
            // Übernahme der ausgewählten Ausgabe in die Eingabefelder
            this.ausgabenInputForm = this.formbuider.group({
                Id: [this.ausgabeEdit.Id],
                AusgabenTypId: [this.ausgabeEdit.AusgabenTypId, [Validators.required]],
                UserId: [this.ausgabeEdit.UserId, [Validators.required]],
                ShopId: [this.ausgabeEdit.ShopId, [Validators.required]],
                Datum: [this.ausgabeEdit.Datum, [Validators.required]],
                Betrag: [this.ausgabeEdit.Betrag.toFixed(2), [Validators.required]],
                Bemerkung: [this.ausgabeEdit.Bemerkung]
            });
        }
        this.resourcesLoaded = true;
    };
    AusgabenInputComponent.prototype.onFormSubmit = function () {
        var ausgaben = this.ausgabenInputForm.value;
        console.log('submit');
        console.log(ausgaben);
        this.resourcesLoaded = false;
        if (this.dateChanged) {
            var ausgabenDatum = ausgaben.Datum;
            ausgabenDatum.setDate(ausgabenDatum.getDate() + 1);
            ausgaben.Datum = ausgabenDatum;
        }
        if (ausgaben.Id == 0) {
            this.addAusgabenEntry(ausgaben);
        }
        else {
            this.updateAusgabenEntry(ausgaben);
        }
        this.resetForm(this.ausgabenInputForm);
        this.resourcesLoaded = true;
    };
    AusgabenInputComponent.prototype.onDateChanged = function (type, event) {
        console.log(event);
        this.dateChanged = true;
    };
    AusgabenInputComponent.prototype.resetForm = function (form) {
        console.log('resetForm');
        console.log('defaultAusgabenTyp:' + this.defaultAusgabenTyp);
        // TODO: reinitialiszation possibly not necessary (ngModel depraceted seeHref:https://angular.io/api/forms/FormControlName#use-with-ngmodel)
        this.defaultAusgabenTyp = 1;
        this.defaultUser = 1;
        this.defaultShop = 1;
        if (form != null) {
            this.currentDate = new Date(); //TODO: warum hat sich der Wert auf Date()-1 geändert?
            console.log('currentDate (ResetForm):');
            console.log(this.currentDate);
            form.reset({ Id: 0, AusgabenTypId: this.defaultAusgabenTyp, Datum: this.currentDate, UserId: this.defaultUser, ShopId: this.defaultShop });
        }
        else {
            this.ausgabenInputForm.reset({ AusgabenTypId: this.defaultAusgabenTyp });
        }
        this.message = null;
    };
    AusgabenInputComponent.prototype.addAusgabenEntry = function (ausgaben) {
        var _this = this;
        console.log('dateChanged: ' + this.dateChanged + 'Date: ' + ausgaben.Datum);
        ausgaben.Datum.setDate(ausgaben.Datum.getDate() - 1); //TODO: warum abzieheh?
        this.service.addNewAusgabe(ausgaben).subscribe(function () {
            _this.message = 'Ausgabe erfolgreich erfasst.';
            _this.ausgabenListComponent.refreshResults();
            _this.dateChanged = false;
            console.log(_this.message);
        });
    };
    AusgabenInputComponent.prototype.updateAusgabenEntry = function (ausgaben) {
        var _this = this;
        this.service.updateAusgabe(ausgaben).subscribe(function () {
            _this.message = 'Ausgabe erfolgreich geändert.';
            _this.ausgabenListComponent.refreshResults();
            console.log(_this.message);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Ausgaben)
    ], AusgabenInputComponent.prototype, "ausgabeEdit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", AusgabenListComponent)
    ], AusgabenInputComponent.prototype, "ausgabenListComponent", void 0);
    AusgabenInputComponent = __decorate([
        Component({
            selector: 'app-ausgaben-input',
            templateUrl: './ausgaben-input.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            AusgabenService,
            AppComponent])
    ], AusgabenInputComponent);
    return AusgabenInputComponent;
}());
export { AusgabenInputComponent };
//# sourceMappingURL=ausgaben-input.component.js.map