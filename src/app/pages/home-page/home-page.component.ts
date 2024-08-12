import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  userService = inject(UserService)
  bitcoinService = inject(BitcoinService)
  user: User = this.userService.getUser()
  BTC$: Observable<string> = this.bitcoinService.getRate(this.user.coins)


}
