import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Ausgaben } from '../shared/ausgaben.model';
import { AusgabenService } from '../shared/ausgaben.service';
import { Observable } from 'rxjs';
import { Ausgabentyp } from '../shared/ausgabentyp.model';
import { User } from '../shared/user.model';
import { Shop } from '../shared/shop.model';


@Component({
  selector: 'app-ausgaben',
  templateUrl: './ausgaben.component.html',
  styles: []
})

export class AusgabenComponent {
 
  @Output() selYearChanged = new EventEmitter<number>();
  @Output() selMonthChanged = new EventEmitter<number>();
  @Input() selYear: number;
  @Input() selMonth: number;
  ausgabeEdit: Ausgaben;
  
  
  getAusgabenUpdate(selected: Ausgaben){
    this.ausgabeEdit = selected;
  }

  getYearUpdate(selected: number){
    console.log('gewähltes Jahr:' + selected);
    this.selYearChanged.emit(selected);
  }

  getMonthUpdate(selected: number){
    console.log('gewählter Monat:' + selected);
    this.selMonthChanged.emit(selected);
  }
}

