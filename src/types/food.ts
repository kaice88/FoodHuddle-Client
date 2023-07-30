export interface FoodOrderListData {
  sessionId: number;
  foodList: FoodOrderItem[];
}

export interface FoodOrderItem {
  id: string;
  foodName: string;
  originPrice: number;
  quantity: number;
  note: string;
  options: SelectedOptions[];
}

export type OptionDetail = { name: string; price: number };
export interface Option {
  mandatory: boolean;
  id: number;
  category: string;
  detail: OptionDetail[];
}

export type SelectedOptions = Pick<Option, "category" | "detail">;

export type MenuItem = {
  id: number;
  foodName: string;
  description: string;
  price: number;
  discountPrice: number;
  photo: string;
  options: Option[];
};

export type Menu = MenuItem[];

export type MenuResponseData = {
  status: string;
  message: string;
  data: Menu;
};
