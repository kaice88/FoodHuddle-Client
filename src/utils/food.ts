import { FoodOrderItem } from "@/types/food";

export function calculateFoodOrderItemTotal(item: FoodOrderItem): number {
  // Add the price of the food item (originPrice * quantity)
  let itemTotal = item.originPrice * item.quantity;

  // Add the price of the options
  const optionsTotal = item.options.reduce((total, option) => {
    const optionTotal = option.detail.reduce(
      (optionTotal, detail) => optionTotal + detail.price,
      0
    );
    return total + optionTotal * item.quantity;
  }, 0);

  return itemTotal + optionsTotal;
}

export function calculateFoodOrderListTotal(foodOrderList: FoodOrderItem[]) {
  return foodOrderList.reduce(
    (total, foodOrderItem) =>
      total + calculateFoodOrderItemTotal(foodOrderItem),
    0
  );
}
