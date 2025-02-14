import { cityPrices } from "./goodsConfig";
import { goods } from "./goodsConfig";

export type FieldType = "start" | "city" | "adventure" | "customs" | "pirates" | "bandits" | "special";

export interface FieldConfig {
    type: FieldType;
    name: string;
    image: string;
    position: number;
    action: (player: any) => void;
}

export const fields: FieldConfig[] = [
    {
        type: "start",
        name: "Стартовое поле",
        image: "/assets/images/start.png",
        position: 0,
        action: (player) => {
            player.addMoney(200);
            console.log(`${player.name} получает 200 монет`);
        },
    },
    {
        type: "pirates",
        name: "Пираты",
        image: "/assets/images/pirates.png",
        position: 10,
        action: (player) => {
            console.log(`${player.name} лишается всех товаров!`);
            player.items = Object.fromEntries(
                goods.map(good => [good.id, 0])
            );
        },
    },
    {
        type: "bandits",
        name: "Разбойники",
        image: "/assets/images/bandits.png",
        position: 18,
        action: (player) => {
            console.log(`${player.name} лишается всех денег!`);
            player.money = 0;
        },
    },
];

const availableFields: FieldConfig[] = [
    {
        type: "city",
        name: "Город A",
        image: "/assets/images/cities/cityA.png",
        position: -1,
        action: (player) => {
            console.log(`${player.name} может покупать и продавать товары`);
            player.cityPrices = cityPrices.A;
        },
    },
    {
        type: "city",
        name: "Город B",
        image: "/assets/images/cities/cityB.png",
        position: -1,
        action: (player) => {
            console.log(`${player.name} может покупать и продавать товары`);
            player.cityPrices = cityPrices.B;
        },
    },
    {
        type: "city",
        name: "Город C",
        image: "/assets/images/cities/cityC.png",
        position: -1,
        action: (player) => {
            console.log(`${player.name} может покупать и продавать товары`);
            player.cityPrices = cityPrices.C;
        },
    },
    {
        type: "city",
        name: "Город D",
        image: "/assets/images/cities/cityD.png",
        position: -1,
        action: (player) => {
            console.log(`${player.name} может покупать и продавать товары`);
            player.cityPrices = cityPrices.D;
        },
    },
    {
        type: "adventure",
        name: "Приключение",
        image: "/assets/images/adventure.png",
        position: -1,
        action: (player) => {
            console.log(`${player.name} берёт карту приключений`);
            // Логика вытягивания карточки
        },
    },
]

// let nextPosition = 1; // Начинаем со 2-й клетки (0-я уже занята стартом)
for (let i = 0; i < 20; i++) {
    if (!fields.some((f) => f.position === i)) { // Если клетка еще не занята
        const fieldToAdd = { ...availableFields[i % availableFields.length], position: i };
        fields.push(fieldToAdd);
        // nextPosition++;
    }
}

