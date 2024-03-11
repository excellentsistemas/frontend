export interface BodyCreate {
  description: string;
  saleValue: number;
  stock: number;
}

export interface ViewProduct {
  guid: string;
  description: string;
  saleValue: number;
  stock: number;
  images: any[];
}
