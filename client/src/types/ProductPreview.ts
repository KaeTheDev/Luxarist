export interface ProductPreview {
    _id: string;
    primaryImageUrl: string;
    name: string;
    price: number;
    category: {
        name: string;
    }
}