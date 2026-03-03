export interface Product {
    _id: string;
    primaryImageUrl: string;
    name: string;
    price: number;
    isNewArrival: boolean;
    category: {
        name: string;
    };
}