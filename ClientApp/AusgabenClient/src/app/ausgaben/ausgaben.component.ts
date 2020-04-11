import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Ausgaben } from '../shared/ausgaben.model';


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
  resourcesLoaded=false;
  
  
  getSelectedAusgabe(selected: Ausgaben){
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

