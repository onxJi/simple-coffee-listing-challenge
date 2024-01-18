import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/ApiService.service';
import { Card } from './models/card.model';
import { CardComponent } from './shared/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'simple-coffee-listing-challenge';
  apiService = inject(ApiService);
  cards: Card[] = [];
  selected1: boolean = true;
  selected2: boolean = false;

  async ngOnInit(): Promise<void> {
    this.selected1 = true;
    this.cards = await this.apiService.getCards();
  }
  selectButton(buttonType: string) {
    if (buttonType === 'AllProducts') {
      this.selected1 = true;
      this.selected2 = false;
      this.apiService.getCards().then((cards) => {
        this.cards = cards;
      });
    } else if (buttonType === 'AvailableNow') {
      this.selected1 = false;
      this.selected2 = true;
      this.apiService.getCards().then((cards) => {
        this.cards = cards.filter(card => card.available);
      });
    }

  }
}
