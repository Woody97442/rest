export type CartItem = {
  itemId: number;
  product: Product;
  quantity: number;
  unitPrice: number;
};
export type Product = {
  id: number;
  reference: string;
  categoryId: number;
  description: string;
  images: string[];
  name: string;
  price: number;
  rating: number;
  shortDescription: string;
  stock: number;
  category: {
    id: number;
    name: string;
    slug: string;
    reference: string;
  };
  updatedAt: Date;
  createdAt: Date;
};

export type Cart = {
  id: number;
  isActive: boolean;
  items: CartItem[];
  total: number;
  userId: number;
  createdAt: Date;
};
