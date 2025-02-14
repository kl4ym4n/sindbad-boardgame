// import { goods } from "./GoodsConfig";

import {goods} from "../goodsConfig";

export class Player {
    name: string;
    color: string;
    money: number;
    items: { [key: string]: number };
    position: number;
    cityPrices: { [key: string]: number } | null = null; // Цены товаров в текущем городе

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
        this.money = 1000;
        this.items = {};

        // Инициализируем инвентарь
        goods.forEach((good) => {
            this.items[good.id] = 0;
        });

        this.position = 0;
    }

    addMoney(amount: number) {
        this.money += amount;
    }

    buyItem(goodId: string) {
        if (!this.cityPrices) return false;
        const price = this.cityPrices[goodId];
        if (this.money >= price) {
            this.money -= price;
            this.items[goodId] += 1;
            console.log(`${this.name} купил ${goodId} за ${price} монет`);
            return true;
        }
        return false;
    }

    sellItem(goodId: string) {
        if (!this.cityPrices) return false;
        const price = this.cityPrices[goodId];
        if (this.items[goodId] > 0) {
            this.money += price;
            this.items[goodId] -= 1;
            console.log(`${this.name} продал ${goodId} за ${price} монет`);
            return true;
        }
        return false;
    }

    move(steps: number, boardSize: number) {
        this.position = (this.position + steps) % boardSize;
        console.log(this.position);
    }
}
