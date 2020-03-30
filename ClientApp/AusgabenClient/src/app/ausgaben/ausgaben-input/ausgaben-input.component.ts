import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AusgabenService } from 'src/app/shared/ausgaben.service';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Ausgaben } from 'src/app/shared/ausgaben.model';
import { AppComponent } from 'src/app/app.component';
import { AusgabenListComponent } from '../ausgaben-list/ausgaben-list.component';
import { AusgabenTypSet } from 'src/app/shared/interfaces/ausgabentyp-set';
import { UserSet } from 'src/app/shared/interfaces/user-set';
import { ShopSet } from 'src/app/shared/interfaces/shop-set';


@Component({
  selector: 'app-ausgaben-input',
  templateUrl: './ausgaben-input.component.html',
  styles: []
})
export class AusgabenInputComponent implements OnInit, OnChanges {
 
  // receives events from AusgabenListComponent
  @Input() ausgabeEdit: Ausgaben; 
  @Input() ausgabenListComponent: AusgabenListComponent;
  dateChanged: boolean;

  constructor(private formbuider: FormBuilder,
    private service: AusgabenService, 
    private appComponent: AppComponent) {
  
   }

  ausgabenInputForm: any;
  ausgabenTypen: AusgabenTypSet[];
  users: UserSet[];
  shops: ShopSet[];

  // Standard values for base data in dropdowns
  defaultAusgabenTyp=1;
  defaultUser=1;
  defaultShop=1;


  currentDate:Date; // Festlegung Calendar auf aktuelles Datum
  message:string;
  
  ngOnInit() {
    // Initialisieren der Eingabefelder
   
    console.log('input:ngOnInit');
    this.currentDate=new Date(); 
    console.log('currentDate (ngOnInit):');
    console.log(this.currentDate);
    this.ausgabenTypen=this.appComponent.allAusgabenTypen;
    this.users=this.appComponent.allUsers;
    this.shops=this.appComponent.allShops;
    this.ausgabenInputForm=this.formbuider.group({
      Id: ['0'],
      AusgabenTypId:[this.defaultAusgabenTyp, [Validators.required]],
      UserId:[this.defaultUser, [Validators.required]],
      ShopId:[this.defaultShop, [Validators.required]],
      Datum:[this.currentDate, [Validators.required]],
      Betrag:['', [Validators.required]],
      Bemerkung:['']
    })
  }

  // occurs, when table entry in ausgabeList has been clicked
  ngOnChanges() {
    console.log('input:ngOnChanges');
    if(this.ausgabeEdit){
        // Übernahme der ausgewählten Ausgabe in die Eingabefelder
        this.ausgabenInputForm=this.formbuider.group({
        Id: [this.ausgabeEdit.Id],
        AusgabenTypId:[this.ausgabeEdit.AusgabenTypId, [Validators.required]],
        UserId:[this.ausgabeEdit.UserId, [Validators.required]],
        ShopId:[this.ausgabeEdit.ShopId, [Validators.required]],
        Datum:[this.ausgabeEdit.Datum, [Validators.required]],
        Betrag:[this.ausgabeEdit.Betrag.toFixed(2), [Validators.required]],
        Bemerkung:[this.ausgabeEdit.Bemerkung]
      })
    }
  }

  onFormSubmit() {  
    const ausgaben = this.ausgabenInputForm.value;  
    console.log(ausgaben);
    if(this.dateChanged){
      
      let ausgabenDatum = ausgaben.Datum;
      ausgabenDatum.setDate(ausgabenDatum.getDate() + 1);
      ausgaben.Datum = ausgabenDatum;
    }

    if(ausgaben.Id=='0'){
      this.addAusgabenEntry(ausgaben); 
     }
    else{
      this.updateAusgabenEntry(ausgaben);
    }
   
    this.resetForm(this.ausgabenInputForm); 
  }  


  onDateChanged(): void {
      this.dateChanged=true;
  }

  resetForm(form?: NgForm) { 
    console.log('resetForm');
    console.log('defaultAusgabenTyp:' + this.defaultAusgabenTyp);

    // TODO: reinitialiszation possibly not necessary (ngModel depraceted seeHref:https://angular.io/api/forms/FormControlName#use-with-ngmodel)
    this.defaultAusgabenTyp=1; 
    this.defaultUser=1;
    this.defaultShop=1;
    if(form!=null){
      this.currentDate=new Date(); //TODO: warum hat sich der Wert auf Date()-1 geändert?
      console.log('currentDate (ResetForm):');
      console.log(this.currentDate);
      form.reset({Id:'0', AusgabenTypId:this.defaultAusgabenTyp, Datum:this.currentDate, UserId: this.defaultUser, ShopId: this.defaultShop});
    }
    else{
      this.ausgabenInputForm.reset({AusgabenTypId:this.defaultAusgabenTyp});
    }
  
    this.message = null;  
  } 
  
  addAusgabenEntry(ausgaben: Ausgaben){
    if(!this.dateChanged){
     ausgaben.Datum.setDate(ausgaben.Datum.getDate()-1); // Antwort: Referenz auf currentDate()?
    }
   
    this.service.addNewAusgabe(ausgaben).subscribe(  
        () => {  
          this.message = 'Ausgabe erfolgreich erfasst.';  
          this.ausgabenListComponent.refreshResults();
          this.dateChanged=false;
          console.log(this.message);
        } 
    ) 
  }

  updateAusgabenEntry(ausgaben: Ausgaben){
    this.service.updateAusgabe(ausgaben).subscribe(  
      () => {  
        this.message = 'Ausgabe erfolgreich geändert.';  
        this.ausgabenListComponent.refreshResults();
        console.log(this.message);
      } 
    ) 
  }
}
