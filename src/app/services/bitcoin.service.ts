import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class BitcoinService {
    private _rate$ = "https://blockchain.info/tobtc?currency=USD&value=1"
    constructor(private http: HttpClient) { }

    getRate(coins: number): Observable<number> {
        return new Observable<number>(obs => {
            this.http.get<number>(this._rate$)
                .subscribe(res => {
                    const rate = res.bpi.USD
                })
        })
    }
}