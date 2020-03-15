import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { AusgabenService } from 'src/app/shared/ausgaben.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Ausgaben } from 'src/app/shared/ausgaben.model';
import { AusgabenComponent } from 'src/app/ausgaben/ausgaben.component';
import { AusgabenListComponent } from '../ausgaben-list/ausgaben-list.component';
var AusgabenInputComponent = /** @class */ (function () {
    function AusgabenInputComponent(formbuider, service, ausgabenComponent) {
        this.formbuider = formbuider;
        this.service = service;
        this.ausgabenComponent = ausgabenComponent;
        this.defaultUser = 1;
        this.defaultShop = 1;
        this.defaultAusgabenTyp = 1;
    }
    AusgabenInputComponent.prototype.ngOnInit = function () {
        // Initialisieren der Eingabefelder
        console.log('input:ngOnInit');
        this.currentDate = new Date();
        console.log('currentDate (ngOnInit):');
        console.log(this.currentDate);
        this.ausgabenTypen = this.appComponent.allAusgabenTypen;
        this.users = this.appComponent.allUsers;
        this.shops = this.appComponente.allShops;
        this.ausgabenInputForm = this.formbuider.group({
            Id: ['0'],
            AusgabenTypId: [this.defaultAusgabenTyp, [Validators.required]],
            UserId: [this.defaultUser, [Validators.required]],
            ShopId: [this.defaultShop, [Validators.required]],
            Datum: [this.currentDate, [Validators.required]],
            Betrag: ['', [Validators.required]],
            Bemerkung: ['']
        });
    };
    // occurs, when table entry in ausgabeList has been clicked
    AusgabenInputComponent.prototype.ngOnChanges = function () {
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
    };
    AusgabenInputComponent.prototype.onFormSubmit = function () {
        var ausgaben = this.ausgabenInputForm.value;
        console.log(ausgaben);
        if (ausgaben.Id == '0') {
            this.addAusgabenEntry(ausgaben);
        }
        else {
            this.updateAusgabenEntry(ausgaben);
        }
        this.resetForm(this.ausgabenInputForm);
    };
    AusgabenInputComponent.prototype.resetForm = function (form) {
        this.defaultAusgabenTyp = 1;
        if (form != null) {
            this.currentDate = new Date(); //TODO: warum hat sich der Wert auf Date()-1 geändert?
            console.log('currentDate (ResetForm):');
            console.log(this.currentDate);
            form.reset({ Id: '0', AusgabenTypId: this.defaultAusgabenTyp, Datum: this.currentDate, UserId: this.defaultUser, ShopId: this.defaultShop });
        }
        else
            this.ausgabenInputForm.reset({ AusgabenTypId: this.defaultAusgabenTyp });
        this.message = null;
    };
    AusgabenInputComponent.prototype.addAusgabenEntry = function (ausgaben) {
        
        if (!this.dateChanged) {
            ausgaben.Datum.setDate(ausgaben.Datum.getDate() - 1); // Antwort: Referenz auf currentDate()?
        }
        this.service.addNewAusgabe(ausgaben).subscribe(function () {
            this.message = 'Ausgabe erfolgreich erfasst.';
            // this.ausgabenTypen = _this.ausgabenComponent.loadAllAusgabenTypen();
            // this.users = _this.ausgabenComponent.loadAllUsers();
            // this.shops = _this.ausgabenComponent.loadAllShops();
            this.ausgabenListComponent.refreshResults();
            this.dateChanged = false;
            console.log(_this.message);
        });
    };
    AusgabenInputComponent.prototype.updateAusgabenEntry = function (ausgaben) {
         this.service.updateAusgabe(ausgaben).subscribe(function () {
            this.message = 'Ausgabe erfolgreich geändert.';
            // this.ausgabenTypen = _this.appComponent.allAusgabenTypen;
            // this.users = _this.ausgabenComponent.loadAllUsers();
            // this.shops = _this.ausgabenComponent.loadAllShops();
            this.ausgabenListComponent.refreshResults();
            console.log(_this.message);
        });
    };
    AusgabenInputComponent.prototype.onDateChanged = function (selectedDate) {
        console.log('DateChanged:' + selectedDate);
        this.dateChanged = true;
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
            AusgabenComponent])
    ], AusgabenInputComponent);
    return AusgabenInputComponent;
}());
export { AusgabenInputComponent };
//# sourceMappingURL=ausgaben-input.component.js.map