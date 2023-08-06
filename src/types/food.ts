export interface FoodOrderListData {
  sessionId: number
  foodOrderList: FoodOrderItem[]
}

export interface FoodOrderItem {
  id: string
  foodName: string
  foodImage: string
  originPrice: number
  quantity: number
  note: string
  options: SelectedOptions[]
}

export interface OptionDetail { name: string ; price: number }
export interface Option {
  mandatory: boolean
  id: number
  category: string
  detail: OptionDetail[]
}

export type SelectedOptions = Pick<Option, 'category' | 'detail'>

export interface MenuItem {
  id: number
  foodName: string
  description: string
  price: number
  discountPrice: number
  photo: string
  options: Option[]
}

export type Menu = MenuItem[]

export interface MenuResponseData {
  status: string
  message: string
  data: Menu
}

export type FoodOrderItemFormValues = Pick<FoodOrderItem, 'quantity' & 'note' & 'options' >
