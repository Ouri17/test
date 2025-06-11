export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: ProductCategory;
  thumbnail_url?: string;
}

export interface OrderProduct extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  uuid: string;
  sessionKey: string;
  messageText: string;
  subtotal: number;
  total: number;
  currency: string;
  createdAt: string;
  products: OrderProduct[];
  customerInfo: {
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    profilePicUrl?: string;
    friendlyName?: string;
  };
  status: OrderStatus;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export type ProductCategory = 
  | 'pains'
  | 'gateaux-individuels' 
  | 'grands-gateaux'
  | 'gateaux-secs'
  | 'plateaux'
  | 'salades-chabbat'
  | 'sale'
  | 'viennoiseries';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  icon: string;
  items: string[];
}