export interface PizzaSize {
  id: string;
  name: string;
  portions: number;
  price: number;
  maxFlavors: number;
}

export interface Product {
  id: string;
  name: string;
  category: "pizzas" | "hamburguesas" | "picadas" | "perros" | "especiales";
  price?: number;
  image?: string;
  description?: string;
  imageUrl?: string; // URL de la imagen del producto
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  flavors?: string[];
  category: string;
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
  observations?: string;
}

export type CategoryKey =
  | "pizzas"
  | "hamburguesas"
  | "picadas"
  | "perros"
  | "especiales";
