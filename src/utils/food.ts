import { FoodOrderItem, SelectedOptions } from "@/types/food";

export function calculateFoodOrderItemTotal(item: FoodOrderItem): number {
  let itemTotal = item.originPrice * item.quantity;

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
export function isOptionsEmpty(options: SelectedOptions[]): boolean {
  if (options.length === 0) {
    return true;
  }

  return options.every((option) => option.detail.length === 0);
}

export const isSameSelectedOptions = (
  item1: FoodOrderItem,
  item2: FoodOrderItem
) => {
  if (item1.options.length !== item2.options.length) {
    return false;
  }

  const sortedOptions1 = [...item1.options].sort(
    (a, b) => a.category === b.category
  );
  const sortedOptions2 = [...item2.options].sort(
    (a, b) => a.category === b.category
  );

  return sortedOptions1.every((option1, index) => {
    const option2 = sortedOptions2[index];

    if (option1.category !== option2.category) {
      return false;
    }

    if (option1.detail.length !== option2.detail.length) {
      return false;
    }

    const sortedDetails1 = [...option1.detail].sort(
      (a, b) => a.name === b.name
    );
    const sortedDetails2 = [...option2.detail].sort(
      (a, b) => a.name === b.name
    );

    return sortedDetails1.every((detail1, index) => {
      const detail2 = sortedDetails2[index];

      return detail1.name === detail2.name && detail1.price === detail2.price;
    });
  });
};
