export type CartItem = {
  itemId: number;
  product: Product;
  days: number;
  unitPrice: number;
};
export type Product = {
  id: number;
  name: string;
  reference: string;
  shortDescription?: string;
  description?: string;
  price: number;
  rating: number;
  country?: string;
  specialty?: string;
  preferences?: string[];
  likes?: string[];
  dislikes?: string[];
  stock: number;
  images: string[];
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type Cart = {
  id: number;
  isActive: boolean;
  items: CartItem[];
  total: number;
  userId: number;
  createdAt: Date;
};
