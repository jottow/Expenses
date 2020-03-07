import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AusgabenService } from 'src/app/shared/ausgaben.service';

import * as Rx from 'rxjs/Rx';
import * as Chart from 'chart.js';
import * as _ from 'lodash';
import { BetragsSet } from 'src/app/shared/interfaces/betrags-set';



@Component({
  selector: 'app-ausgaben-kreisdiagramme',
  templateUrl: './ausgaben-kreisdiagramme.component.html',
  styleUrls: ['./ausgaben-kreisdiagramme.component.css']
})
export class AusgabenKreisdiagrammeComponent implements OnInit, OnChanges {
  ausgabenArrayUsers: BetragsSet[];
  ausgabenArrayAusgabenTyp: BetragsSet[];
  selectedYear:number;
  monthName:string;
  betraege:number[];
  existBetraege=true;
  groupedbetraege=[]; //TODO: bisher keine Gruppierung
  ausgabenTypenNames:string[];
  resourcesLoaded=false;
  isRefreshMode=false;

  chartDataPerUser = {
    data: [],
    backgroundColor: [],
    labels:this.baseComponent.userNames
  };

  chartDataPerAusgabenTyp = {
    data: [],
    backgroundColor: [],
    labels:this.ausgabenTypenNames
  };
 
 
  @Input() selYear: number; 
  @Input() selMonth: number; 
  @Output() selYearChanged =  new EventEmitter<number>();
  @Output() selMonthChanged = new EventEmitter<number>();

  @ViewChild('pieChartRatioUsers') private chartRefPerUsers;
  @ViewChild('pieChartRatioAusgabenTyp') private chartRefPerAusgabenTyp;

  pieChartRatioUsers : Chart;
  pieChartRatioAusgabenTyp: Chart;
 
  chartOptions = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black'
      }
    }
  };

  constructor(private service: AusgabenService,
    private baseComponent:AppComponent) {
  }

  ngOnInit() {
    // this.monthName=this.service.getMonthName(this.selMonth);
    // this.getchartDataPerUser(this.selMonth);
  }

  ngOnChanges(){
    this.resourcesLoaded=false;
    this.monthName=this.service.getMonthName(this.selMonth);
    console.log('Auswertungen Stat: ngOnChanges:' + this.monthName);
    this.getchartDataPerUser();
    setTimeout(()=>{
    this.getchartDataPerAusgabenTyp();
  },100);
    
    if(this.isRefreshMode){
      console.log('rerender');
      if(this.pieChartRatioUsers){
        console.log('pieChartRatioUsers');
        this.pieChartRatioUsers.update();
        console.log(this.pieChartRatioUsers);
      }

      if(this.pieChartRatioAusgabenTyp){
        console.log('pieChartRatioAusgabenTyp');
        this.pieChartRatioAusgabenTyp.update();
        console.log(this.pieChartRatioAusgabenTyp);
      }
    }
  }

  getchartDataPerUser(){
    this.ausgabenArrayUsers=[];
    this.betraege=[];
     // setTimeout(()=>{
    this.baseComponent.allAusgaben.subscribe(
      data => {
        data.forEach(b=>{
          this.ausgabenArrayUsers.push({tag:'', betrag:b.Betrag, einkaeuferId:b.UserId, ausgabenTyp:'0'});
         });

          // Gruppierung nach Einkäufer
        let groupedData: any = [];
        Rx.Observable.from(this.ausgabenArrayUsers)
        .groupBy(x => x.einkaeuferId) // using groupBy from Rxjs
        .flatMap(group => group.toArray())// GroupBy dont create a array object so you have to flat it
        .map(g => {// mapping 
          return {
            einkaeuferId: g[0].einkaeuferId,//take the first name because we grouped them by name
            betrag: _.sumBy(g, 'betrag'), // using lodash to sum quantity
          }
        })
        .toArray() //.toArray because I guess you want to loop on it with ngFor      
        // .do(sum => console.log('sum: Einkäufer', sum)) // just for debug
        .subscribe(d => groupedData = d); 
        groupedData= groupedData.sort((a, b) => (a.einkaeuferId > b.einkaeuferId) ? 1 : -1);
        // console.log('alle erfassten Ausgaben (getchartDataPerUser):');
        // console.log(groupedData);
    
        let groupedDataErgaenzt=[];
      
        for(var einkaeuferId:number = 1; einkaeuferId<=this.baseComponent.userNames.length; einkaeuferId++){
          var found=groupedData.find(f=>f.einkaeuferId===einkaeuferId);
          if(!found){
            groupedDataErgaenzt.push({betrag:0, einkaeuferId: einkaeuferId});
          }
          else{
            groupedDataErgaenzt.push({betrag:found.betrag, einkaeuferId: found.einkaeuferId});
          }
        }

        // console.log('groupedDataErgaenzt');
        // console.log(groupedDataErgaenzt) ;
        this.betraege = groupedDataErgaenzt.map(b=>b.betrag.toFixed(2));
        // console.log('betr: Einkäufer');
        // console.log(this.betraege);
        

        this.chartDataPerUser.backgroundColor=this.baseComponent.userColors;
        this.chartDataPerUser.data=this.betraege;
        this.chartDataPerUser.labels=this.baseComponent.userNames;
        let positiveBetraege=this.betraege.find(f=>f>0);
        console.log('positiveBetraege (chartDataPerUser)');
        console.log(positiveBetraege);
        this.existBetraege=false;
        if(positiveBetraege>0)
          this.existBetraege=true;
      }
    );
      // },100);
  
    console.log('existBetraege (stat-Users');
    console.log(this.existBetraege);
    if(this.pieChartRatioUsers){
  //  console.log(this.pieChartRatioUsers.canvas.getContext('2d'));
      console.log('destroy pieChartRatioUsers');
      this.pieChartRatioUsers.destroy();
    }
    this.pieChartRatioUsers = new Chart(this.chartRefPerUsers.nativeElement,{
      type: 'pie',
      data: {
        labels:this.baseComponent.userNames,
        datasets:[this.chartDataPerUser],
        
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
  }
  
  getchartDataPerAusgabenTyp(){
  
    this.ausgabenArrayAusgabenTyp=[];
    this.betraege=[];
   
    
    
   
    this.baseComponent.allAusgaben.subscribe(
      data => {
        data.forEach(b=>{
          this.ausgabenArrayAusgabenTyp.push({tag:'', betrag:b.Betrag, einkaeuferId:0,ausgabenTyp:b.AusgabenTypId});
          this.existBetraege=true;
        });
    
        this.ausgabenArrayAusgabenTyp=this.ausgabenArrayAusgabenTyp.sort(s=>s.ausgabenTyp);
        
        let groupedData: any = [];
        Rx.Observable.from(this.ausgabenArrayAusgabenTyp)
        .groupBy(x => x.ausgabenTyp) // using groupBy from Rxjs
        .flatMap(group => group.toArray())// GroupBy dont create a array object so you have to flat it
        .map(g => {// mapping 
          return {
            ausgabenTyp: g[0].ausgabenTyp,//take the first name because we grouped them by name
            betrag: _.sumBy(g, 'betrag'), // using lodash to sum quantity
          }
        })
        .toArray() //.toArray because I guess you want to loop on it with ngFor      
        .do(sum => console.log('sum AusgabenTypen:', sum)) // just for debug
        .subscribe(d => groupedData = d.sort(s=>s.ausgabenTyp)); 
        
        // Syntaktische korrekte Lösung zum Sotrieren der gruppierten Gruppierungsdaten:
        href:https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
        groupedData= groupedData.sort((a, b) => (a.ausgabenTyp > b.ausgabenTyp) ? 1 : -1);
      //   console.log('alle erfassten Ausgaben:');
      //   console.log(groupedData);
      // console.log(this.allAusgabenTypen);
        let groupedDataErgaenzt=[];
      
        for(var ausgabenTyp:number = 1; ausgabenTyp<=this.baseComponent.ausgabenTypenNames.length; ausgabenTyp++){
          var found=groupedData.find(f=>f.ausgabenTyp===ausgabenTyp);
          if(!found){
            groupedDataErgaenzt.push({betrag:0, ausgabenTyp: ausgabenTyp});
          }
          else{
            groupedDataErgaenzt.push({betrag:found.betrag, ausgabenTyp: found.ausgabenTyp});
          }
        
      }

      this.resourcesLoaded=true;
      this.betraege = groupedDataErgaenzt.map(b=>b.betrag.toFixed(2));
      // console.log('sortedArray:');
      // console.log(groupedDataErgaenzt);
      // console.log('betr: Typen');
      // console.log(this.betraege);

      this.chartDataPerAusgabenTyp.backgroundColor=this.baseComponent.ausgabenTypColors;
      this.chartDataPerAusgabenTyp.data=this.betraege;
      this.chartDataPerAusgabenTyp.labels=this.baseComponent.ausgabenTypenNames;
      if(this.pieChartRatioAusgabenTyp){
        //  console.log(this.pieChartRatioUsers.canvas.getContext('2d'));
            console.log('destroy pieChartRatioAusgabenTyp');
            this.pieChartRatioAusgabenTyp.destroy();
        }
        this.pieChartRatioAusgabenTyp = new Chart(this.chartRefPerAusgabenTyp.nativeElement,{
          type: 'pie',
          data: {
            labels:this.chartDataPerAusgabenTyp.labels,
            datasets:[this.chartDataPerAusgabenTyp],
            
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
      }
    );
  }

  getYearUpdate(selected: number){
    this.isRefreshMode=false;
    console.log('kreisdiags: gewähltes Jahr:' + selected);
    this.selYear=selected;
    this.refreshResults(selected, this.selMonth);
  }

  getMonthUpdate(selected: number){
    this.isRefreshMode=false;
    console.log('kreisdiags: gewählter Monat:' + selected);
    this.selMonth=selected;
    this.refreshResults(this.selYear, this.selMonth);
  }

  refreshResults(selectedYear?:number, selectedMonth?:number) {
    console.log('kreisdiags: refreshResults');
    this.baseComponent.selectedYear = selectedYear;
    this.baseComponent.selectedMonth = selectedMonth;
   
    this.selYearChanged.emit(selectedYear);
    this.selMonthChanged.emit(selectedMonth);
    this.isRefreshMode=true;
  }

  refreshChart(chart:Chart){
    chart.canvas.hidden=true;
    setTimeout(()=>{
      chart.canvas.hidden=false;
      chart.update();
    
    },1);
  }
}
