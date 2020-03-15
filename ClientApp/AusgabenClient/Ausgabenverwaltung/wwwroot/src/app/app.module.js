import { __decorate, __metadata } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatCardModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatToolbarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule, MatTabsModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { AusgabenComponent } from './ausgaben/ausgaben.component';
import { AusgabenInputComponent } from './ausgaben/ausgaben-input/ausgaben-input.component';
import { AusgabenService } from './shared/ausgaben.service';
import { AusgabenListComponent } from './ausgaben/ausgaben-list/ausgaben-list.component';
import { AusgabenAuswertungenComponent } from './ausgaben-auswertungen/ausgaben-verlauf/ausgaben-auswertungen.component';
import { AusgabenKreisdiagrammeComponent } from './ausgaben-auswertungen/ausgaben-kreisdiagramme/ausgaben-kreisdiagramme.component';
import { DatepickerViewsSelection } from 'src/app/shared/month-picker/month-picker.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
        registerLocaleData(localeDe);
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                AusgabenComponent,
                AusgabenInputComponent,
                AusgabenListComponent,
                AusgabenAuswertungenComponent,
                AusgabenKreisdiagrammeComponent,
                DatepickerViewsSelection
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatMenuModule,
                MatDatepickerModule,
                MatNativeDateModule,
                MatIconModule,
                MatCardModule,
                MatSidenavModule,
                MatFormFieldModule,
                MatInputModule,
                MatTooltipModule,
                MatToolbarModule,
                MatSelectModule,
                MatTableModule,
                MatSortModule,
                MatPaginatorModule,
                MatProgressSpinnerModule,
                MatTabsModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [AusgabenService, { provide: LOCALE_ID, useValue: 'de' }, { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }],
            bootstrap: [AppComponent]
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map