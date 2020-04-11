import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AusgabenService } from 'src/app/shared/ausgaben.service';
import { Chart } from 'chart.js';
import { AppComponent } from 'src/app/app.component';
import { ChartColorsUser } from 'src/app/shared/enums/chart-colors-user.enum';
import { AusgabenListComponent } from 'src/app/ausgaben/ausgaben-list/ausgaben-list.component';
var AusgabenAuswertungenComponent = /** @class */ (function () {
    function AusgabenAuswertungenComponent(service, baseComponent) {
        this.service = service;
        this.baseComponent = baseComponent;
        this.GroupedBetraege = []; //TODO: bisher keine Gruppierung
        this.existBetraege = true;
        this.resourcesLoaded = false;
        this.isRefreshMode = false;
        this.selYearChanged = new EventEmitter();
        this.selMonthChanged = new EventEmitter();
        // chartOptions = {
        //   legend: {
        //     display: true,
        //     position: 'top',
        //     labels: {
        //       boxWidth: 80,
        //       fontColor: 'black'
        //     }
        //   }
        // };
        this.yearList = this.service.getYearList();
        this.monthList = this.service.getMonthList();
    }
    AusgabenAuswertungenComponent.prototype.ngOnInit = function () {
        console.log('Auswertungen: ngOnInit:' + this.baseComponent.selectedYear + ' ' + this.baseComponent.selectedMonth);
        // this.selectedYear = this.baseComponent.selectedYear; 
        // this.selectedMonth = this.baseComponent.selectedMonth;
    };
    AusgabenAuswertungenComponent.prototype.ngOnChanges = function () {
        this.resourcesLoaded = false;
        this.betraege = [];
        this.monthName = this.service.getMonthName(this.selMonth);
        console.log('Auswertungen: ngOnChanges:' + this.monthName);
        this.getChartData();
    };
    AusgabenAuswertungenComponent.prototype.getChartData = function () {
        var _this = this;
        this.chartDataSets = [];
        this.ausgabenArray = [];
        this.baseComponent.allAusgaben.subscribe(function (data) {
            data.forEach(function (b) {
                var monatsTag = ('00' + new Date(b.Datum).getDate()).slice(-2);
                _this.ausgabenArray.push({ tag: monatsTag, betrag: b.Betrag, einkaeuferId: b.UserId, ausgabenTyp: '' });
            });
            var _loop_1 = function (day) {
                if (!_this.ausgabenArray.find(function (d) { return d.tag === _this.baseComponent.pad(day, 2); })) {
                    _this.ausgabenArray.push({ tag: _this.baseComponent.pad(day, 2), betrag: 0, einkaeuferId: 0, ausgabenTyp: '' });
                }
            };
            for (var day = 1; day <= _this.service.getDaysInMonth(_this.selMonth, _this.selYear); day++) {
                _loop_1(day);
            }
            ;
            _this.ausgabenArray = _this.ausgabenArray.sort(function (a, b) {
                if (a.tag < b.tag)
                    return -1;
                if (a.tag > b.tag)
                    return 1;
                return 0;
            });
            console.log('AusgabenArray:');
            console.log(_this.ausgabenArray);
            var colorIndex = 0;
            _this.baseComponent.allUsers.forEach(function (u) {
                // console.log(this.chartDataSets);
                _this.chartDataSets.push({ label: u.Name, data: [], fill: false, backgroundColor: ChartColorsUser[colorIndex] });
                colorIndex++;
                var betraege = [];
                _this.ausgabenArray.map(function (a) {
                    var b = 0;
                    if (a.einkaeuferId === u.UserId) {
                        b = a.betrag;
                    }
                    betraege.push(b);
                });
                _this.betraege.push(betraege);
            });
            _this.monatsTage = _this.ausgabenArray.map(function (_a) {
                var tag = _a.tag;
                return tag;
            });
            _this.existBetraege = false;
            var chartDataIndex = 0;
            var positiveBetraege = 0;
            _this.chartDataSets.forEach(function (c) {
                var betraegePerChartData = _this.betraege[chartDataIndex];
                c.label = _this.baseComponent.userNames[chartDataIndex];
                c.data = betraegePerChartData;
                positiveBetraege = c.data.find(function (b) { return b > 0; });
                if (positiveBetraege > 0) {
                    console.log('positiveBetraegePos  (barChart)');
                    console.log(positiveBetraege);
                    _this.existBetraege = true;
                }
                chartDataIndex++;
            });
            _this.resourcesLoaded = true;
            // console.log('ChartData');
            // console.log(this.chartDataSets);
            // console.log('existBetraege?');
            // console.log(this.existBetraege); 
            _this.barChart = new Chart(_this.chartRef.nativeElement, {
                type: 'bar',
                data: {
                    labels: _this.monatsTage,
                    datasets: _this.chartDataSets
                },
                options: {
                    legend: {
                        display: true
                    },
                    scales: {
                        xAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: false
                                }
                            }],
                        yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                    }
                }
            });
        });
    };
    AusgabenAuswertungenComponent.prototype.getYearUpdate = function (selected) {
        console.log('Auswertungen: gewähltes Jahr:' + selected);
        this.selYear = selected;
        this.refreshResults(selected, this.selMonth);
    };
    AusgabenAuswertungenComponent.prototype.getMonthUpdate = function (selected) {
        console.log('Auswertungen: gewählter Monat:' + selected);
        this.selMonth = selected;
        this.refreshResults(this.selYear, this.selMonth);
    };
    AusgabenAuswertungenComponent.prototype.refreshResults = function (selectedYear, selectedMonth) {
        console.log('auswertungen: refreshResults');
        this.baseComponent.selectedYear = selectedYear;
        this.baseComponent.selectedMonth = selectedMonth;
        this.selYearChanged.emit(selectedYear);
        this.selMonthChanged.emit(selectedMonth);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AusgabenAuswertungenComponent.prototype, "selMonth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AusgabenAuswertungenComponent.prototype, "selYear", void 0);
    __decorate([
        Input(),
        __metadata("design:type", AusgabenListComponent)
    ], AusgabenAuswertungenComponent.prototype, "ausgabenListComponent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenAuswertungenComponent.prototype, "selYearChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AusgabenAuswertungenComponent.prototype, "selMonthChanged", void 0);
    __decorate([
        ViewChild('barChart'),
        __metadata("design:type", Object)
    ], AusgabenAuswertungenComponent.prototype, "chartRef", void 0);
    AusgabenAuswertungenComponent = __decorate([
        Component({
            selector: 'app-ausgaben-auswertungen',
            templateUrl: './ausgaben-auswertungen.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [AusgabenService,
            AppComponent])
    ], AusgabenAuswertungenComponent);
    return AusgabenAuswertungenComponent;
}());
export { AusgabenAuswertungenComponent };
//# sourceMappingURL=ausgaben-auswertungen.component.js.map