export interface Option {
  name: string;
  price: number;
}

export interface FoodItem {
  foodName: string;
  originPrice: number;
  quantity: number;
  note: string;
  options: Option[];
}

export interface FoodList {
  sessionId: number;
  foodList: FoodItem[];
}

export interface FoodListResponse {
  status: string;
  message: string;
  foodList: FoodList;
}
