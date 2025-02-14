export interface Good {
    id: string;
    name: string;
    image: string;
}

export const goods: Good[] = [
    { id: "good1", name: "Пряности", image: "/assets/images/goods/Spice.png" },
    { id: "good2", name: "Древесина", image: "/assets/images/goods/Wood.png" },
    { id: "good3", name: "Драгоценности", image: "/assets/images/goods/Jewel.png" },
    { id: "good4", name: "Шелка", image: "/assets/images/goods/Silk.png" },
];

export const cityPrices = {
    A: { good1: 50, good2: 100, good3: 100, good4: 150 },
    B: { good1: 100, good2: 50, good3: 150, good4: 100 },
    C: { good1: 150, good2: 100, good3: 50, good4: 100 },
    D: { good1: 100, good2: 150, good3: 100, good4: 50 },
};
