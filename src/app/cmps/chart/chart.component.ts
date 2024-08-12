import { Component, inject, OnInit } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';
import { BitcoinService } from '../../services/bitcoin.service';
import { Observable, Subscription } from 'rxjs';


interface Trade {
    name: string
    value: number
}

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    //test
    saleData = [
        { name: '11/23/2021', value: 494762556.34959996 },
        { name: '11/24/2021', value: 480199475.88900006 },
        { name: '11/25/2021', value: 332409438.7548 },
        { name: '11/26/2021', value: 289094884.176 },
        { name: '11/27/2021', value: 777492583.0165 },
        { name: '11/28/2021', value: 277078998.492 },
        { name: '11/29/2021', value: 252736299.37800002 },
        { name: '11/30/2021', value: 367826530.49249995 },
        { name: '12/1/2021', value: 522506214.22769994 },
        { name: '12/2/2021', value: 479668944.2496 },
        { name: '12/3/2021', value: 431885271.2832 }
        // { name: "Mobiles", value: 105000 },
        // { name: "Laptop", value: 55000 },
        // { name: "AC", value: 15000 },
        // { name: "Headset", value: 150000 },
        // { name: "Fridge", value: 20000 }
    ];

    trades$!: Observable<Trade>
    // subscription: Subscription

    constructor(private bitcoinService: BitcoinService) { }

    async ngOnInit(): Promise<void> {
        this.trades$ = this.bitcoinService.getTradeVolume()
    }

}



