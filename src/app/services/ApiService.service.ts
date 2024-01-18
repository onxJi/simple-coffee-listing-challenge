import { Injectable } from "@angular/core";
import { Card } from "../models/card.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    _apiUrl: string;

    constructor() {
        this._apiUrl = "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json";
    }

    async getCards(): Promise<Card[]> {
        let cards: Card[] = [];
        try {
            await fetch(this._apiUrl)
                .then(response => response.json())
                .then(data => {
                    cards = data as Card[];
                });
        } catch (error) {
            console.log(error);
        }
        return cards;
    }
}