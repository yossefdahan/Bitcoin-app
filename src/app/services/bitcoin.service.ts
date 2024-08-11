import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class BitcoinService {

    constructor(private http: HttpClient) { }

    getRate(coins: number): Observable<number> {
        const apiUrl = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
        return this.http.get<number>(apiUrl)
            .pipe(
                retry(1),
                catchError(this._handleError)
            )
    }

    getMarketPrice(): Observable<any> {
        const url = 'https://api.blockchain.info/charts/market-price?timespan=1years&format=json'
        return this.http.get<any>(url)
            .pipe(
                retry(1),
                catchError(this._handleError)
            )
    }

    getConfirmedTransactions(): Observable<any> {
        const url = 'https://api.blockchain.info/charts/n-transactions?timespan=1years&format=json'
        return this.http.get<any>(url)
            .pipe(
                retry(1),
                catchError(this._handleError)
            )
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }
}
