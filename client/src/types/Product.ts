export interface Product {
    _id: string;
    primaryImageUrl: string;
    name: string;
    price: number;
    category: {
        name: string;
    };
}