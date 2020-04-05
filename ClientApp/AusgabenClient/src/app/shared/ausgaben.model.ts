import { Ausgabentyp } from './ausgabentyp.model';

export class Ausgaben {
    Id:number;
    AusgabenTypId:number;
    AusgabenTyp:string;
    UserId:number;
    User:string;
    ShopId: number;
    Shop: string;
    Betrag: number;
    Datum: Date;
    Bemerkung: string;
}
