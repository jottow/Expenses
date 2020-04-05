import { Component, EventEmitter, OnInit, Output, ViewChild, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AusgabenService } from 'src/app/shared/ausgaben.service';
import {AppComponent} from 'src/app/app.component'; 
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import 'rxjs/add/observable/of';
import { Ausgaben } from 'src/app/shared/ausgaben.model';


@Component({
  selector: 'app-ausgabenlist',
  templateUrl: './ausgaben-list.component.html',
  styles: []
})

export class AusgabenListComponent implements OnInit{
 
  dataSource = new MatTableDataSource<Ausgaben>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns = ['AusgabenTyp', 'Betrag', 'Datum', 'User', 'Shop', 'Bemerkung','Delete'];
  
  // sends the marked list entry to the parent
  @Output() ausgabeEdit = new EventEmitter<Ausgaben>();
  @Output() selYearChanged = new EventEmitter<number>();
  @Output() selMonthChanged = new EventEmitter<number>();
  @Input() selYear: number;
  @Input() selMonth: number;
 
  
  message: string;
  ausgabeTypName: string;
  resourcesLoaded=false;

  constructor(private http: HttpClient, 
    private service: AusgabenService,
    private baseComponent: AppComponent
  
   ) { }

  ngOnInit() {
    console.log('list: ngOnOnit'); 
    if(!this.selYear){
      this.selYear=this.baseComponent.selectedYear;
      this.selMonth=this.baseComponent.selectedMonth;
    }    
   
    this.baseComponent.allAusgaben.subscribe(
      data => {
        this.dataSource.data = data;
      }
    );

    this.dataSource.paginator= this.paginator;
    setTimeout(()=>{
    this.dataSource.sort=this.sort;
    })
    this.resourcesLoaded=true;
  }

  // ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  //   throw new Error("Method not implemented.");
  // }


  refreshResults(selectedYear?:number, selectedMonth?:number) {
    console.log('list: refreshResults');
   
    if(!selectedYear){
      console.log('kein selectedYear:');
      console.log(this.baseComponent.selectedYear);
      console.log(this.baseComponent.selectedMonth);
      selectedYear=this.baseComponent.selectedYear;
      selectedMonth=this.baseComponent.selectedMonth;
    }
    else{
      this.baseComponent.selectedYear = selectedYear;
      this.baseComponent.selectedMonth = selectedMonth;
    }

    console.log(selectedYear);
    console.log(selectedMonth);
    this.service.getAllAusgaben(selectedYear,selectedMonth).subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  
    this.selYearChanged.emit(selectedYear);
    this.selMonthChanged.emit(selectedMonth);
    this.resourcesLoaded=true;
  }

  // Filter: event keyup (Eingabe in Filter)
  applyFilter(filterValue: string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  // Summenzeile: mat-footer-cell
  getTotalCost() {
    return this.dataSource.filteredData.map(d=>d.Betrag).reduce((acc, value) => acc + value, 0);
  }

  // Aufruf, wenn Zeile in Aufgabenliste ausgewählt
  loadAusgabeToEdit(ausgabe?: Ausgaben) { 
    if(ausgabe){
      console.log('ausgewählt:'+ ausgabe.Id); 
      this.service.getAusgabeById(ausgabe.Id).subscribe(ausgabe=> {  
        this.message = null;  
      });  
    }
    else{
      console.log('Initialize after deletion');
      let ausgabeInit=new Ausgaben();
      ausgabeInit.Id=0;
      ausgabeInit.AusgabenTypId=1;
      ausgabeInit.Betrag=0;
      ausgabeInit.ShopId=1;
      ausgabeInit.UserId=1;
      ausgabeInit.Bemerkung='';
      ausgabe=ausgabeInit;
    }
    this.ausgabeEdit.emit(ausgabe);  
  }

  onDelete(Id){
    if(confirm('Eintrag löschen?')){
      this.resourcesLoaded=false;
      this.service.deleteAusgabe(Id)
       .subscribe(res =>{
        console.log('list: ngOnDelete');
        this.baseComponent.allAusgaben.subscribe(
          data => {
            this.dataSource.data=data;
            this.resourcesLoaded=true;
            this.loadAusgabeToEdit();
          }
        );},
        //this.toastr.warning('Deleted successfully', 'Payment Detail Register');},
         err =>{
           console.log(err);
         }
      );
    }
  }

  getYearUpdate(selected: number){
    console.log('gewähltes Jahr:' + selected);
   this.selYear=selected;
   this.refreshResults(selected, this.selMonth);
  }

  getMonthUpdate(selected: number){
    console.log('gewählter Monat:' + selected);
   this.selMonth=selected;
   this.refreshResults(this.selYear, selected);
  }
}

