import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http'; 
import { Observable, pipe } from 'rxjs';  
import  'rxjs/add/operator/map'; 

import {Ausgaben} from './ausgaben.model';
import {Ausgabentyp} from './ausgabentyp.model';
import { MatTableDataSource } from '@angular/material';
import { User } from './user.model';
import { Shop } from './shop.model';


@Injectable({
  providedIn: 'root'
})
export class AusgabenService {

  // private props
  dataSource = new MatTableDataSource<Ausgaben>();
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
 // url = 'http://www.it-impact.de/api';
  url = 'http://ausgabenverwaltung/api'; 
  
  
  //constructor
  constructor(private http: HttpClient) { }
  
  // methods
  // *** Ausgaben
  getAllAusgaben(year?:number, month?: number): Observable<Ausgaben[]> {  
    return this.http.get<Ausgaben[]>(this.url + '/ausgaben')
    .map(res => {
      res.forEach(r=> {
        this.getAusgabenTypById(r.AusgabenTypId.toString()).subscribe(ausgabeTyp=> {
            r.AusgabenTyp=ausgabeTyp.Name;
          });
          this.getUserById(r.UserId.toString()).subscribe(user=> {
            r.User=user.Name;
          })
          this.getShopById(r.ShopId.toString()).subscribe(shop=> {
          r.Shop=shop.Name;
        })
      });
  
      this.dataSource.data = res;
    
      // gesetzte Jahres- und Monatsfilter anwenden
      console.log(month);
      if(year > 0 && month > 0){
        //console.log(res.filter(r => new Date(r.Datum).getFullYear() === year && new Date(r.Datum).getMonth() === month - 1));
        return res.filter(r => new Date(r.Datum).getFullYear() === year && new Date(r.Datum).getMonth() === month - 1);
      }
      else{
        return res;
      }

    });
   } 

  getAusgabeById(ausgabenId: string): Observable<Ausgaben> {  
    return this.http.get<Ausgaben>(this.url + '/ausgaben/' + ausgabenId);  
  } 
  
  addNewAusgabe(ausgaben: Ausgaben): Observable<Ausgaben> {  
    return this.http.post<Ausgaben>(this.url + '/ausgaben', ausgaben, this.httpOptions);
  } 

  updateAusgabe(ausgaben: Ausgaben): Observable<Ausgaben> {  
    return this.http.put<Ausgaben>(this.url + '/ausgaben/' + ausgaben.Id, ausgaben, this.httpOptions);
  } 
  deleteAusgabe(ausgabeId: number) {
    return this.http.delete(this.url + '/ausgaben/' + ausgabeId);
  }

    // AusgabenTyp
  getAllAusgabenTypen(): Observable<Ausgabentyp[]> {  
      return this.http.get<Ausgabentyp[]>(this.url + '/ausgabentyp');  
  } 

  getAusgabenTypById(id: string): Observable<Ausgabentyp> {  
      return this.http.get<Ausgabentyp>(this.url + '/ausgabentyp/' + id );  
  } 

    // user
  getAllUsers(): Observable<User[]> {  
    return this.http.get<User[]>(this.url + '/user');  
  } 

  getUserById(id: string): Observable<User> {  
    return this.http.get<User>(this.url + '/user/' + id );  
  } 

  //shop
  getAllShops(): Observable<Shop[]> {  
    return this.http.get<Shop[]>(this.url + '/shop');  
  } 

  getShopById(id: string): Observable<Shop> {  
    return this.http.get<Shop>(this.url + '/shop/' + id );  
  } 

  getMonthName(id:number): string{
    console.log( this.getMonthList().find(m=>m.Value===id).Text);
    return  this.getMonthList().find(m=>m.Value===id).Text;
  }

  // *** Ausgaben 
  // *** common

  getDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
   };
 
  getYearList(){
    var yearList = [];
    var currentYear= new Date().getFullYear();
    for(let year=currentYear; year>=currentYear-10; year-- ){
      yearList.push(year);
    }
  
    return yearList;
  }

  // TODO: generische Lösung?
  getMonthList(){
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
  }

// *** common
}

 
