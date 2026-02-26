import type { ProductPreview } from "../types/ProductPreview";

export const MOCK_PRODUCTS: ProductPreview[] = [
  {
    _id: "1",
    name: "Solitaire Diamond Ring",
    primaryImageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    category: { name: "Rings" },
    price: 2500
  },
  {
    _id: "2",
    name: "18k Gold Essential Chain",
    primaryImageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    category: { name: "Necklaces" },
    price: 850
  },
  {
    _id: "3",
    name: "Pearl Drop Earrings",
    primaryImageUrl: "https://images.unsplash.com/photo-1535633302704-b02f4f14187e?w=800&q=80",
    category: { name: "Earrings" },
    price: 1200
  },
  {
    _id: "4",
    name: "Diamond Tennis Bracelet",
    primaryImageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    category: { name: "Bracelets" },
    price: 4800
  }
];