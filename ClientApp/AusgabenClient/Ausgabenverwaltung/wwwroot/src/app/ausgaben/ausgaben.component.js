import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
var AusgabenComponent = /** @class */ (function () {
    function AusgabenComponent() {
        this.selYearChanged = new EventEmitter();
        this.selMonthChanged = new EventEmitter();
        this.resourcesLoaded = false;
    }
    AusgabenComponent.prototype.getSelectedAusgabe = function (selected) {
        this.ausgabeEdit = selected;
    };
    AusgabenComponent.prototype.getYearUpdate = function (selected) {
        console.log('gewähltes Jahr:' + selected);
        this.selYearChanged.emit(selected);
    };
    AusgabenComponent.prototype.getMonthUpdate = function (selected) {
        console.log('gewählter Monat:' + selected);
        this.selMonthChanged.emit(selected);
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenComponent.prototype, "selYearChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenComponent.prototype, "selMonthChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AusgabenComponent.prototype, "selYear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AusgabenComponent.prototype, "selMonth", void 0);
    AusgabenComponent = __decorate([
        Component({
            selector: 'app-ausgaben',
            templateUrl: './ausgaben.component.html',
            styles: []
        })
    ], AusgabenComponent);
    return AusgabenComponent;
}());
export { AusgabenComponent };
//# sourceMappingURL=ausgaben.component.js.map