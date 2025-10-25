export namespace Purchases {
  export interface Item {
    id?: string;
    orderId?: number;
    name: string;
    category?: Category;
    quantity: number | string;
    observation?: string;
    price: number | string;
    totalItemPrice?: number | string;
  }

  export interface Category {
    id?: string | number;
    name: string;
    emoji: string;
    color?: string;
  }

  export interface List {
    id?: string;
    title: string;
    items: Item[];
    totalItems: number;
    totalPrice: number | string;
    observation?: string;
  }
}
