import { Component, OnInit, OnChanges } from '@angular/core';
import { ChartColorsUser } from './shared/enums/chart-colors-user.enum';
import { UserSet } from './shared/interfaces/user-set';
import { AusgabenService } from './shared/ausgaben.service';
import { Observable } from 'rxjs';
import { Ausgaben } from './shared/ausgaben.model';
import { Ausgabentyp } from './shared/ausgabentyp.model';
import { ShopSet } from './shared/interfaces/shop-set';
import { ChartColorsShops } from './shared/enums/chart-colors.shop.enum';

enum ChartColorsAusgabenTypen {
  "grey",
  "green",
  "yellow",
  "blue",
  "red",
  "orange"
}

interface AusgabenTypSet {
  AusgabenTypId: number;
  Name:string;
  Color:string;
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent implements OnInit, OnChanges {
  
  
  title = 'Ausgaben-Client';
  selectedYear:number;
  selectedMonth:number;
  allAusgaben: Observable<Ausgaben[]>;

  allAusgabenTypen: AusgabenTypSet[];
  ausgabenTypenNames: string[];
  ausgabenTypColors: string[];
  
  allUsers: UserSet[];
  userNames: string[];
  userColors: string[];

  allShops: ShopSet[];
  shopNames: string[];
  shopColors: string[];

 
  prefTabs = [
    {label: 'Ausgabenverläufe', content: 'Ausgabenverläufe'},
    {label: 'Weitere Statistiken', content: 'Weitere Stats'}
  
  ];
 
  constructor(private service: AusgabenService) {
  }

  ngOnInit(){
    console.log('app.component OnInit');
    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = new Date().getMonth() + 1; // getMonth() is 0-based
    this.allUsers=[];
    this.allAusgabenTypen=[];
    this.allShops=[];

    // Dropdowns in input form
    this.getUsers();
    this.getAusgabenTypen();
    this.getShops();

    // expenses list
    this.getAusgaben();
   
    
    
    
  }

  ngOnChanges(){
    console.log('app.component OnChanges');
    this.getAusgaben();
  }

 

  getAusgaben(){
    this.allAusgaben= this.service.getAllAusgaben(this.selectedYear, this.selectedMonth);
  }

  getAusgabenTypen(){
    this.service.getAllAusgabenTypen().subscribe(
      data => {
        let colorIndex = 0;
          data.forEach(at=>{
          this.allAusgabenTypen.push({AusgabenTypId:at.AusgabenTypId, Name:at.Name, Color:ChartColorsAusgabenTypen[colorIndex]});
          colorIndex++;
        });

        this.ausgabenTypenNames=this.allAusgabenTypen.map(at=>at.Name)
        this.ausgabenTypColors = this.allAusgabenTypen.map(at => at.Color);
        console.log('AusgabenTypColors:');
        console.log(this.ausgabenTypColors);
        console.log('AusgabentypNames:');
        console.log(this.ausgabenTypenNames);
      }  
    );
  }

 getUsers(){
    this.service.getAllUsers().subscribe(
      data => {
          let colorIndex = 0;
          data.forEach(b=>{
            this.allUsers.push({UserId:b.UserId, Name:b.Name, Color:ChartColorsUser[colorIndex]});
            colorIndex++;
          });

          this.userNames =this.allUsers.map(u=>u.Name)
          console.log('Users:');
          console.log(this.allUsers);

          this.userColors=this.allUsers.map(u => u.Color);
          console.log('UserColors:');
          console.log(this.userColors);
          console.log('UserNames:');
          console.log(this.userNames);
        }  
      );
  }

  getShops(){
    this.service.getAllShops().subscribe(
      data => {
          let colorIndex = 0;
          data.forEach(s=>{
            this.allShops.push({ShopId:s.ShopId, Name:s.Name, Color:ChartColorsShops[colorIndex]});
            colorIndex++;
          });

          this.shopNames =this.allShops.map(s=>s.Name)
          console.log('Shops:');
          console.log(this.allShops);

          this.shopColors=this.allShops.map(u => u.Color);
          console.log('ShopColors:');
          console.log(this.shopColors);
          console.log('ShopNames:');
          console.log(this.shopNames);
        }  
      );

  }

  // fügt "0"-en vor übergebene Zahl, bis "size" erreicht ist:
  //Bsp: number=9, size=2: ==> "09"
  pad(num:number, size:number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }

    return s;
  }
 

  // TODO: bisher nicht genutzt ==> Aggregation
  groupBy(list:number[], keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      
      if (!collection) {
          map.set(key, [item]);
      } 
      else {
          collection.push(item);
      }
    });
    
    return map;
  }

  getYearUpdate(selected: number){
   // console.log('gewähltes Jahr (app.component):' + selected);
    this.selectedYear=selected;
    this.getAusgaben();
  }

  getMonthUpdate(selected: number){
  //  console.log('gewählter Monat (app.component):' + selected);
    this.selectedMonth=selected;
    this.getAusgaben();
  }
}

export namespace AppComponent {
  export enum ChartColors {
    red = "red",
    blue = "blue",
    green = "green",
    yellow = "yellow",
  }
}
