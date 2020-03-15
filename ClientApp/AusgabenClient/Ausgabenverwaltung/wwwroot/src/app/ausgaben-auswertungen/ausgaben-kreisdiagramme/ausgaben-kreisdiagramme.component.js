import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AusgabenService } from 'src/app/shared/ausgaben.service';
import * as Rx from 'rxjs/Rx';
import * as Chart from 'chart.js';
import * as _ from 'lodash';
var AusgabenKreisdiagrammeComponent = /** @class */ (function () {
    function AusgabenKreisdiagrammeComponent(service, baseComponent) {
        this.service = service;
        this.baseComponent = baseComponent;
        this.existBetraege = true;
        this.groupedbetraege = []; //TODO: bisher keine Gruppierung
        this.resourcesLoaded = false;
        this.isRefreshMode = false;
        this.chartDataPerUser = {
            data: [],
            backgroundColor: [],
            labels: this.baseComponent.userNames
        };
        this.chartDataPerAusgabenTyp = {
            data: [],
            backgroundColor: [],
            labels: this.ausgabenTypenNames
        };
        this.selYearChanged = new EventEmitter();
        this.selMonthChanged = new EventEmitter();
        this.chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 80,
                    fontColor: 'black'
                }
            }
        };
    }
    AusgabenKreisdiagrammeComponent.prototype.ngOnInit = function () {
        // this.monthName=this.service.getMonthName(this.selMonth);
        // this.getchartDataPerUser(this.selMonth);
    };
    AusgabenKreisdiagrammeComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.resourcesLoaded = false;
        this.monthName = this.service.getMonthName(this.selMonth);
        console.log('Auswertungen Stat: ngOnChanges:' + this.monthName);
        this.getchartDataPerUser();
        setTimeout(function () {
            _this.getchartDataPerAusgabenTyp();
        }, 100);
        if (this.isRefreshMode) {
            console.log('rerender');
            if (this.pieChartRatioUsers) {
                console.log('pieChartRatioUsers');
                this.pieChartRatioUsers.update();
                console.log(this.pieChartRatioUsers);
            }
            if (this.pieChartRatioAusgabenTyp) {
                console.log('pieChartRatioAusgabenTyp');
                this.pieChartRatioAusgabenTyp.update();
                console.log(this.pieChartRatioAusgabenTyp);
            }
        }
    };
    AusgabenKreisdiagrammeComponent.prototype.getchartDataPerUser = function () {
        var _this = this;
        this.ausgabenArrayUsers = [];
        this.betraege = [];
        // setTimeout(()=>{
        this.baseComponent.allAusgaben.subscribe(function (data) {
            data.forEach(function (b) {
                _this.ausgabenArrayUsers.push({ tag: '', betrag: b.Betrag, einkaeuferId: b.UserId, ausgabenTyp: '0' });
            });
            // Gruppierung nach Einkäufer
            var groupedData = [];
            Rx.Observable.from(_this.ausgabenArrayUsers)
                .groupBy(function (x) { return x.einkaeuferId; }) // using groupBy from Rxjs
                .flatMap(function (group) { return group.toArray(); }) // GroupBy dont create a array object so you have to flat it
                .map(function (g) {
                return {
                    einkaeuferId: g[0].einkaeuferId,
                    betrag: _.sumBy(g, 'betrag'),
                };
            })
                .toArray() //.toArray because I guess you want to loop on it with ngFor      
                // .do(sum => console.log('sum: Einkäufer', sum)) // just for debug
                .subscribe(function (d) { return groupedData = d; });
            groupedData = groupedData.sort(function (a, b) { return (a.einkaeuferId > b.einkaeuferId) ? 1 : -1; });
            // console.log('alle erfassten Ausgaben (getchartDataPerUser):');
            // console.log(groupedData);
            var groupedDataErgaenzt = [];
            for (var einkaeuferId = 1; einkaeuferId <= _this.baseComponent.userNames.length; einkaeuferId++) {
                var found = groupedData.find(function (f) { return f.einkaeuferId === einkaeuferId; });
                if (!found) {
                    groupedDataErgaenzt.push({ betrag: 0, einkaeuferId: einkaeuferId });
                }
                else {
                    groupedDataErgaenzt.push({ betrag: found.betrag, einkaeuferId: found.einkaeuferId });
                }
            }
            // console.log('groupedDataErgaenzt');
            // console.log(groupedDataErgaenzt) ;
            _this.betraege = groupedDataErgaenzt.map(function (b) { return b.betrag.toFixed(2); });
            // console.log('betr: Einkäufer');
            // console.log(this.betraege);
            _this.chartDataPerUser.backgroundColor = _this.baseComponent.userColors;
            _this.chartDataPerUser.data = _this.betraege;
            _this.chartDataPerUser.labels = _this.baseComponent.userNames;
            var positiveBetraege = _this.betraege.find(function (f) { return f > 0; });
            console.log('positiveBetraege (chartDataPerUser)');
            console.log(positiveBetraege);
            _this.existBetraege = false;
            if (positiveBetraege > 0)
                _this.existBetraege = true;
        });
        // },100);
        console.log('existBetraege (stat-Users');
        console.log(this.existBetraege);
        if (this.pieChartRatioUsers) {
            //  console.log(this.pieChartRatioUsers.canvas.getContext('2d'));
            console.log('destroy pieChartRatioUsers');
            this.pieChartRatioUsers.destroy();
        }
        this.pieChartRatioUsers = new Chart(this.chartRefPerUsers.nativeElement, {
            type: 'pie',
            data: {
                labels: this.baseComponent.userNames,
                datasets: [this.chartDataPerUser],
            },
            options: {
                title: {
                    display: true,
                    text: 'Anteile an den Einkäufen'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 80,
                        fontColor: 'black'
                    }
                }
            }
        });
    };
    AusgabenKreisdiagrammeComponent.prototype.getchartDataPerAusgabenTyp = function () {
        var _this = this;
        this.ausgabenArrayAusgabenTyp = [];
        this.betraege = [];
        this.baseComponent.allAusgaben.subscribe(function (data) {
            data.forEach(function (b) {
                _this.ausgabenArrayAusgabenTyp.push({ tag: '', betrag: b.Betrag, einkaeuferId: 0, ausgabenTyp: b.AusgabenTypId });
                _this.existBetraege = true;
            });
            _this.ausgabenArrayAusgabenTyp = _this.ausgabenArrayAusgabenTyp.sort(function (s) { return s.ausgabenTyp; });
            var groupedData = [];
            Rx.Observable.from(_this.ausgabenArrayAusgabenTyp)
                .groupBy(function (x) { return x.ausgabenTyp; }) // using groupBy from Rxjs
                .flatMap(function (group) { return group.toArray(); }) // GroupBy dont create a array object so you have to flat it
                .map(function (g) {
                return {
                    ausgabenTyp: g[0].ausgabenTyp,
                    betrag: _.sumBy(g, 'betrag'),
                };
            })
                .toArray() //.toArray because I guess you want to loop on it with ngFor      
                .do(function (sum) { return console.log('sum AusgabenTypen:', sum); }) // just for debug
                .subscribe(function (d) { return groupedData = d.sort(function (s) { return s.ausgabenTyp; }); });
            // Syntaktische korrekte Lösung zum Sotrieren der gruppierten Gruppierungsdaten:
            href: https: //flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
             groupedData = groupedData.sort(function (a, b) { return (a.ausgabenTyp > b.ausgabenTyp) ? 1 : -1; });
            //   console.log('alle erfassten Ausgaben:');
            //   console.log(groupedData);
            // console.log(this.allAusgabenTypen);
            var groupedDataErgaenzt = [];
            for (var ausgabenTyp = 1; ausgabenTyp <= _this.baseComponent.ausgabenTypenNames.length; ausgabenTyp++) {
                var found = groupedData.find(function (f) { return f.ausgabenTyp === ausgabenTyp; });
                if (!found) {
                    groupedDataErgaenzt.push({ betrag: 0, ausgabenTyp: ausgabenTyp });
                }
                else {
                    groupedDataErgaenzt.push({ betrag: found.betrag, ausgabenTyp: found.ausgabenTyp });
                }
            }
            _this.resourcesLoaded = true;
            _this.betraege = groupedDataErgaenzt.map(function (b) { return b.betrag.toFixed(2); });
            // console.log('sortedArray:');
            // console.log(groupedDataErgaenzt);
            // console.log('betr: Typen');
            // console.log(this.betraege);
            _this.chartDataPerAusgabenTyp.backgroundColor = _this.baseComponent.ausgabenTypColors;
            _this.chartDataPerAusgabenTyp.data = _this.betraege;
            _this.chartDataPerAusgabenTyp.labels = _this.baseComponent.ausgabenTypenNames;
            if (_this.pieChartRatioAusgabenTyp) {
                //  console.log(this.pieChartRatioUsers.canvas.getContext('2d'));
                console.log('destroy pieChartRatioAusgabenTyp');
                _this.pieChartRatioAusgabenTyp.destroy();
            }
            _this.pieChartRatioAusgabenTyp = new Chart(_this.chartRefPerAusgabenTyp.nativeElement, {
                type: 'pie',
                data: {
                    labels: _this.chartDataPerAusgabenTyp.labels,
                    datasets: [_this.chartDataPerAusgabenTyp],
                },
                options: {
                    title: {
                        display: true,
                        text: 'Anteile pro Ausgabentyp'
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 80,
                            fontColor: 'black'
                        }
                    }
                }
            });
        });
    };
    AusgabenKreisdiagrammeComponent.prototype.getYearUpdate = function (selected) {
        this.isRefreshMode = false;
        console.log('kreisdiags: gewähltes Jahr:' + selected);
        this.selYear = selected;
        this.refreshResults(selected, this.selMonth);
    };
    AusgabenKreisdiagrammeComponent.prototype.getMonthUpdate = function (selected) {
        this.isRefreshMode = false;
        console.log('kreisdiags: gewählter Monat:' + selected);
        this.selMonth = selected;
        this.refreshResults(this.selYear, this.selMonth);
    };
    AusgabenKreisdiagrammeComponent.prototype.refreshResults = function (selectedYear, selectedMonth) {
        console.log('kreisdiags: refreshResults');
        this.baseComponent.selectedYear = selectedYear;
        this.baseComponent.selectedMonth = selectedMonth;
        this.selYearChanged.emit(selectedYear);
        this.selMonthChanged.emit(selectedMonth);
        this.isRefreshMode = true;
    };
    AusgabenKreisdiagrammeComponent.prototype.refreshChart = function (chart) {
        chart.canvas.hidden = true;
        setTimeout(function () {
            chart.canvas.hidden = false;
            chart.update();
        }, 1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AusgabenKreisdiagrammeComponent.prototype, "selYear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AusgabenKreisdiagrammeComponent.prototype, "selMonth", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenKreisdiagrammeComponent.prototype, "selYearChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenKreisdiagrammeComponent.prototype, "selMonthChanged", void 0);
    __decorate([
        ViewChild('pieChartRatioUsers'),
        __metadata("design:type", Object)
    ], AusgabenKreisdiagrammeComponent.prototype, "chartRefPerUsers", void 0);
    __decorate([
        ViewChild('pieChartRatioAusgabenTyp'),
        __metadata("design:type", Object)
    ], AusgabenKreisdiagrammeComponent.prototype, "chartRefPerAusgabenTyp", void 0);
    AusgabenKreisdiagrammeComponent = __decorate([
        Component({
            selector: 'app-ausgaben-kreisdiagramme',
            templateUrl: './ausgaben-kreisdiagramme.component.html',
            styleUrls: ['./ausgaben-kreisdiagramme.component.css']
        }),
        __metadata("design:paramtypes", [AusgabenService,
            AppComponent])
    ], AusgabenKreisdiagrammeComponent);
    return AusgabenKreisdiagrammeComponent;
}());
export { AusgabenKreisdiagrammeComponent };
//# sourceMappingURL=ausgaben-kreisdiagramme.component.js.map