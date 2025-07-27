export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image?: string;
  inStock: boolean;
  createdAt: Date;
}