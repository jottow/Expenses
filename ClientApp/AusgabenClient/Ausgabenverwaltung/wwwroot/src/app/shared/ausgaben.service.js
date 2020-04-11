import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { MatTableDataSource } from '@angular/material';
var AusgabenService = /** @class */ (function () {
    //constructor
    function AusgabenService(http) {
        this.http = http;
        // private props
        this.dataSource = new MatTableDataSource();
        this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // url = 'http://www.it-impact.de/api';
        this.url = 'http://ausgabenverwaltung/api';
    }
    // methods
    // *** Ausgaben
    AusgabenService.prototype.getAllAusgaben = function (year, month) {
        var _this = this;
        return this.http.get(this.url + '/ausgaben')
            .map(function (res) {
            res.forEach(function (r) {
                _this.getAusgabenTypById(r.AusgabenTypId).subscribe(function (ausgabeTyp) {
                    r.AusgabenTyp = ausgabeTyp.Name;
                });
                _this.getUserById(r.UserId.toString()).subscribe(function (user) {
                    r.User = user.Name;
                });
                _this.getShopById(r.ShopId).subscribe(function (shop) {
                    r.Shop = shop.Name;
                });
            });
            _this.dataSource.data = res;
            // gesetzte Jahres- und Monatsfilter anwenden
            console.log(month);
            if (year > 0 && month > 0) {
                //console.log(res.filter(r => new Date(r.Datum).getFullYear() === year && new Date(r.Datum).getMonth() === month - 1));
                return res.filter(function (r) { return new Date(r.Datum).getFullYear() === year && new Date(r.Datum).getMonth() === month - 1; });
            }
            else {
                return res;
            }
        });
    };
    AusgabenService.prototype.getAusgabeById = function (ausgabenId) {
        return this.http.get(this.url + '/ausgaben/' + ausgabenId.toString());
    };
    AusgabenService.prototype.addNewAusgabe = function (ausgaben) {
        return this.http.post(this.url + '/ausgaben', ausgaben, this.httpOptions);
    };
    AusgabenService.prototype.updateAusgabe = function (ausgaben) {
        return this.http.put(this.url + '/ausgaben/' + ausgaben.Id, ausgaben, this.httpOptions);
    };
    AusgabenService.prototype.deleteAusgabe = function (ausgabeId) {
        return this.http.delete(this.url + '/ausgaben/' + ausgabeId);
    };
    // AusgabenTyp
    AusgabenService.prototype.getAllAusgabenTypen = function () {
        return this.http.get(this.url + '/ausgabentyp');
    };
    AusgabenService.prototype.getAusgabenTypById = function (id) {
        return this.http.get(this.url + '/ausgabentyp/' + id);
    };
    // user
    AusgabenService.prototype.getAllUsers = function () {
        return this.http.get(this.url + '/user');
    };
    AusgabenService.prototype.getUserById = function (id) {
        return this.http.get(this.url + '/user/' + id);
    };
    //shop
    AusgabenService.prototype.getAllShops = function () {
        return this.http.get(this.url + '/shop');
    };
    AusgabenService.prototype.getShopById = function (id) {
        return this.http.get(this.url + '/shop/' + id);
    };
    AusgabenService.prototype.getMonthName = function (id) {
        console.log(this.getMonthList().find(function (m) { return m.Value === id; }).Text);
        return this.getMonthList().find(function (m) { return m.Value === id; }).Text;
    };
    // *** Ausgaben 
    // *** common
    AusgabenService.prototype.getDaysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };
    ;
    AusgabenService.prototype.getYearList = function () {
        var yearList = [];
        var currentYear = new Date().getFullYear();
        for (var year = currentYear; year >= currentYear - 10; year--) {
            yearList.push(year);
        }
        return yearList;
    };
    // TODO: generische Lösung?
    AusgabenService.prototype.getMonthList = function () {
        var monthList = [
            { Value: 0, Text: 'Alle Monate' },
            { Value: 1, Text: 'Januar' },
            { Value: 2, Text: 'Februar' },
            { Value: 3, Text: 'März' },
            { Value: 4, Text: 'April' },
            { Value: 5, Text: 'Mai' },
            { Value: 6, Text: 'Juni' },
            { Value: 7, Text: 'Juli' },
            { Value: 8, Text: 'August' },
            { Value: 9, Text: 'September' },
            { Value: 10, Text: 'Oktober' },
            { Value: 11, Text: 'November' },
            { Value: 12, Text: 'Dezember' }
        ];
        return monthList;
    };
    AusgabenService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], AusgabenService);
    return AusgabenService;
}());
export { AusgabenService };
//# sourceMappingURL=ausgaben.service.js.map