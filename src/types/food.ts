interface FoodOrderListResponse {
  status: string;
  message: string;
  data: FoodOrderListData;
}

interface FoodOrderListData {
  sessionId: number;
  foodList: FoodOrderItem[];
}

export interface FoodOrderItem {
  id: string;
  foodName: string;
  originPrice: number;
  quantity: number;
  note: string;
  options: { category: string; detail: Option }[];
}

export interface Option {
  name: string;
  price: number;
}

export type OptionCategory = {
  mandatory: boolean;
  id: number;
  name: string;
  optionItems: Option[];
};

export type MenuItem = {
  id: number;
  foodName: string;
  description: string;
  price: number;
  discountPrice: number;
  photo: string;
  options: OptionCategory[];
};

export type Menu = MenuItem[];

export type MenuResponseData = {
  status: string;
  message: string;
  data: Menu;
};
