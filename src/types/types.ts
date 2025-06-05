export interface Cubby {
    cubbyid: number;
    remaining_items: number;
    occupied: string;
    orderid: string;
}

export interface Products {
    sku: number;
    name: string;
    count: number;
}

export interface Operators {
    id: number;
    name: string;
    image: string;
}

export interface ScannedItem {
    itemid: number;
    orderid: string;
    sku: number;
    scanned: boolean;
    "Scan Date": string;
}

export interface Operators {
    name: string;
    email: string;
    color_hex: string;
    created_at: string;
}