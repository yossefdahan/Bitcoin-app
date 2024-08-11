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
export class HomePageComponent implements OnInit {
  user: User | null = null
  bitcoinRate: number | null = null

  userService = inject(UserService)
  bitcoinService = inject(BitcoinService)

  ngOnInit(): void {
    this.user = this.userService.getUser()

    this.bitcoinService.getRate(this.user.coins).subscribe({
      next: value => {
        this.bitcoinRate = value
      },
      error: err => {
        console.error("Error fetching Bitcoin rate:", err)
      }
    })

  }



}
