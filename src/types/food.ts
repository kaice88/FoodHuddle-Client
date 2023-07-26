interface Option {
  name: string;
  price: number;
}

interface FoodItem {
  foodName: string;
  originPrice: number;
  quantity: number;
  note: string;
  options: Option[];
}

interface FoodList {
  sessionId: number;
  foodList: FoodItem[];
}

interface FoodListResponse {
  status: string;
  message: string;
  foodList: FoodList;
}
