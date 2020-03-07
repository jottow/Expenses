import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AusgabenService } from 'src/app/shared/ausgaben.service';
import {Chart} from 'chart.js';
import * as _ from 'lodash';
import {AppComponent} from  'src/app/app.component';
import {ChartColorsUser} from 'src/app/shared/chart-colors-user.enum';
import { AusgabenListComponent } from 'src/app/ausgaben/ausgaben-list/ausgaben-list.component';
import { BetragsSet } from 'src/app/shared/interfaces/betrags-set';


interface ChartDataSets{
  label: string,
  data: number[],
  fill: boolean,
  backgroundColor: string

}


@Component({
  selector: 'app-ausgaben-auswertungen',
  templateUrl: './ausgaben-auswertungen.component.html',
  styles: []
})

export class AusgabenAuswertungenComponent implements OnInit, OnChanges {
  ausgabenArray: BetragsSet[];
  monthName:string;
  monatsTage:string[];
  betraege:Array<Array<number>>;
  GroupedBetraege=[]; //TODO: bisher keine Gruppierung
  existBetraege: boolean = true;
  resourcesLoaded=false;
  isRefreshMode=false;
  
 
  @Input() selMonth: number; 
  @Input() selYear: number; 
  @Input() ausgabenListComponent: AusgabenListComponent;
  @Output() selYearChanged =  new EventEmitter<number>();
  @Output() selMonthChanged = new EventEmitter<number>();

  
  @ViewChild('barChart') private chartRef;

  
  barChart : Chart;
  
  chartDataSets: ChartDataSets[];
 
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
  
  yearList = this.service.getYearList();
  monthList = this.service.getMonthList();
 
  constructor(private service: AusgabenService, 
              private baseComponent:AppComponent) {
  }

  ngOnInit() {
    console.log('Auswertungen: ngOnInit:' + this.baseComponent.selectedYear + ' ' + this.baseComponent.selectedMonth );
    // this.selectedYear = this.baseComponent.selectedYear; 
    // this.selectedMonth = this.baseComponent.selectedMonth;
  }

  ngOnChanges(){
    this.resourcesLoaded=false;
    this.betraege=[];
    this.monthName=this.service.getMonthName(this.selMonth);
    console.log('Auswertungen: ngOnChanges:' + this.monthName);
    this.getChartData();
  }

  getChartData(){
    this.chartDataSets=[];
    this.ausgabenArray=[];
    this.baseComponent.allAusgaben.subscribe(
      data => {
        data.forEach(b=>{
          let monatsTag=('00' + new Date(b.Datum).getDate()).slice(-2);
          this.ausgabenArray.push({tag:monatsTag, betrag:b.Betrag, einkaeuferId:b.UserId, ausgabenTyp:''})
        });
        
        for(let day=1; day<=this.service.getDaysInMonth(this.selMonth,this.selYear); day++){
          if(!this.ausgabenArray.find(d=>d.tag === this.baseComponent.pad(day,2))){
              this.ausgabenArray.push({tag:this.baseComponent.pad(day,2), betrag:0,  einkaeuferId:0,  ausgabenTyp:''});
          }
        };
  
        this.ausgabenArray= this.ausgabenArray.sort((a,b)=>{
            if (a.tag < b.tag) return -1;
            if (a.tag > b.tag) return 1;
            return 0;
        });
          
        console.log('AusgabenArray:');
        console.log(this.ausgabenArray);
        let colorIndex = 0;
        this.baseComponent.allUsers.forEach(u=>{
          // console.log(this.chartDataSets);
          this.chartDataSets.push({label:u.Name, data:[], fill:false, backgroundColor:ChartColorsUser[colorIndex]} );
          colorIndex++;
          let betraege=[];
          this.ausgabenArray.map(a=>{
            let b=0;
            if(a.einkaeuferId===u.UserId){
              b=a.betrag;
            }
  
            betraege.push(b);
          });
          
          this.betraege.push(betraege);
        });

        this.monatsTage = this.ausgabenArray.map(({ tag }) => tag);
        this.existBetraege=false;
        let chartDataIndex=0;
        var positiveBetraege=0;
        this.chartDataSets.forEach(c=>{
          let betraegePerChartData = this.betraege[chartDataIndex];
          c.label=this.baseComponent.userNames[chartDataIndex];
          c.data=betraegePerChartData;
          
          positiveBetraege =  c.data.find(b=>b>0);
          if(positiveBetraege>0){
            console.log('positiveBetraegePos  (barChart)');
            console.log(positiveBetraege);
            this.existBetraege=true;
          }
          
          chartDataIndex++;
        });
  
        this.resourcesLoaded=true;
        // console.log('ChartData');
        // console.log(this.chartDataSets);
      
        // console.log('existBetraege?');
        // console.log(this.existBetraege); 
        this.barChart = new Chart(this.chartRef.nativeElement,{
          type: 'bar',
          data: {
            labels: this.monatsTage,
            datasets: this.chartDataSets
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
                }  ]
              }
            }
          });
        }
      );
  }

  getYearUpdate(selected: number){
    console.log('Auswertungen: gewähltes Jahr:' + selected);
    this.selYear=selected;
    this.refreshResults(selected, this.selMonth);
  }

  getMonthUpdate(selected: number){
    console.log('Auswertungen: gewählter Monat:' + selected);
   this.selMonth=selected;
   this.refreshResults(this.selYear, this.selMonth);
  }
  refreshResults(selectedYear?:number, selectedMonth?:number) {
    console.log('auswertungen: refreshResults');
    this.baseComponent.selectedYear = selectedYear;
    this.baseComponent.selectedMonth = selectedMonth;
   
    this.selYearChanged.emit(selectedYear);
    this.selMonthChanged.emit(selectedMonth);
  }
}
