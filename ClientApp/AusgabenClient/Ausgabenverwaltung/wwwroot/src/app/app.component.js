import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ChartColorsUser } from './shared/enums/chart-colors-user.enum';
import { AusgabenService } from './shared/ausgaben.service';
import { ChartColorsShops } from './shared/enums/chart-colors.shop.enum';
import { ChartColorsAusgabenTypen } from './shared/enums/chart-colors-ausgabenTypen.enum';
var AppComponent = /** @class */ (function () {
    function AppComponent(service) {
        this.service = service;
        this.title = 'Ausgaben-Client';
        this.prefTabs = [
            { label: 'Ausgabenverläufe', content: 'Ausgabenverläufe' },
            { label: 'Weitere Statistiken', content: 'Weitere Stats' }
        ];
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('app.component OnInit');
        this.selectedYear = new Date().getFullYear();
        this.selectedMonth = new Date().getMonth() + 1; // getMonth() is 0-based
        this.allUsers = [];
        this.allAusgabenTypen = [];
        this.allShops = [];
        // Dropdowns in input form
        this.getUsers();
        this.getAusgabenTypen();
        this.getShops();
        // expenses list, evaluations (Auswertungen)
        this.getAusgaben();
    };
    AppComponent.prototype.ngOnChanges = function () {
        console.log('app.component OnChanges');
        this.getAusgaben();
    };
    AppComponent.prototype.getAusgaben = function () {
        this.allAusgaben = this.service.getAllAusgaben(this.selectedYear, this.selectedMonth);
    };
    AppComponent.prototype.getAusgabenTypen = function () {
        var _this = this;
        this.service.getAllAusgabenTypen().subscribe(function (data) {
            var colorIndex = 0;
            data.forEach(function (at) {
                _this.allAusgabenTypen.push({ AusgabenTypId: at.AusgabenTypId, Name: at.Name, Color: ChartColorsAusgabenTypen[colorIndex] });
                colorIndex++;
            });
            _this.ausgabenTypenNames = _this.allAusgabenTypen.map(function (at) { return at.Name; });
            _this.ausgabenTypColors = _this.allAusgabenTypen.map(function (at) { return at.Color; });
            console.log('AusgabenTypColors:');
            console.log(_this.ausgabenTypColors);
            console.log('AusgabentypNames:');
            console.log(_this.ausgabenTypenNames);
        });
    };
    AppComponent.prototype.getUsers = function () {
        var _this = this;
        this.service.getAllUsers().subscribe(function (data) {
            var colorIndex = 0;
            data.forEach(function (b) {
                _this.allUsers.push({ UserId: b.UserId, Name: b.Name, Color: ChartColorsUser[colorIndex] });
                colorIndex++;
            });
            _this.userNames = _this.allUsers.map(function (u) { return u.Name; });
            console.log('Users:');
            console.log(_this.allUsers);
            _this.userColors = _this.allUsers.map(function (u) { return u.Color; });
            console.log('UserColors:');
            console.log(_this.userColors);
            console.log('UserNames:');
            console.log(_this.userNames);
        });
    };
    AppComponent.prototype.getShops = function () {
        var _this = this;
        this.service.getAllShops().subscribe(function (data) {
            var colorIndex = 0;
            data.forEach(function (s) {
                _this.allShops.push({ ShopId: s.ShopId, Name: s.Name, Color: ChartColorsShops[colorIndex] });
                colorIndex++;
            });
            _this.shopNames = _this.allShops.map(function (s) { return s.Name; });
            console.log('Shops:');
            console.log(_this.allShops);
            _this.shopColors = _this.allShops.map(function (u) { return u.Color; });
            console.log('ShopColors:');
            console.log(_this.shopColors);
            console.log('ShopNames:');
            console.log(_this.shopNames);
        });
    };
    // fügt "0"-en vor übergebene Zahl, bis "size" erreicht ist:
    //Bsp: number=9, size=2: ==> "09"
    AppComponent.prototype.pad = function (num, size) {
        var s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    };
    // TODO: bisher nicht genutzt ==> Aggregation
    AppComponent.prototype.groupBy = function (list, keyGetter) {
        var map = new Map();
        list.forEach(function (item) {
            var key = keyGetter(item);
            var collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            }
            else {
                collection.push(item);
            }
        });
        return map;
    };
    AppComponent.prototype.getYearUpdate = function (selected) {
        // console.log('gewähltes Jahr (app.component):' + selected);
        this.selectedYear = selected;
        this.getAusgaben();
    };
    AppComponent.prototype.getMonthUpdate = function (selected) {
        //  console.log('gewählter Monat (app.component):' + selected);
        this.selectedMonth = selected;
        this.getAusgaben();
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [AusgabenService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
(function (AppComponent) {
    var ChartColors;
    (function (ChartColors) {
        ChartColors["red"] = "red";
        ChartColors["blue"] = "blue";
        ChartColors["green"] = "green";
        ChartColors["yellow"] = "yellow";
    })(ChartColors = AppComponent.ChartColors || (AppComponent.ChartColors = {}));
})(AppComponent || (AppComponent = {}));
//# sourceMappingURL=app.component.js.map