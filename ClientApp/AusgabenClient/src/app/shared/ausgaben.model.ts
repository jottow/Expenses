import { Ausgabentyp } from './ausgabentyp.model';

export class Ausgaben {
    Id:string;
    AusgabenTypId:string;
    AusgabenTyp:string;
    UserId:number;
    User:string;
    ShopId: string;
    Shop: string;
    Betrag: number;
    Datum: Date;
    Bemerkung: string;
}
