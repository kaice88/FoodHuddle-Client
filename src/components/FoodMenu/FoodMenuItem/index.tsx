import { ActionIcon, Flex, Box, Text, Title } from "@mantine/core";
import type { MenuItem } from "@/types/food";
import { IconPlus } from "@tabler/icons-react";
import { moneyFormat } from "@/utils";
import useModal from "@/hooks/useModal";
import isEmpty from "lodash/isEmpty";
import AddOrderForm from "@/components/FoodOrderForm/Add";

interface FoodItemProps {
  foodMenuItem: MenuItem;
}

export function PriceDisplay({
  price,
  discountPrice,
}: {
  price: number;
  discountPrice: number;
}) {
  if (discountPrice > 0) {
    return (
      <div>
        <Text size="xs" td="line-through">
          {moneyFormat(price, "VND", "vi-VN")}
        </Text>
        <Text fw={700} size="md" style={{ color: "#FF6B00" }}>
          {moneyFormat(discountPrice, "VND", "vi-VN")}
        </Text>
      </div>
    );
  } else {
    return (
      <Text size="md" fw={700} style={{ color: "#FF6B00" }}>
        {moneyFormat(price, "VND", "vi-VN")}
      </Text>
    );
  }
}

function FoodMenuItem({ foodMenuItem }: FoodItemProps) {
  const { openModal } = useModal(
    <Title order={4}>{"Order Customization"}</Title>,
    <AddOrderForm menuItem={foodMenuItem} />
  );

  const orderHandler = () => {
    openModal();
  };
  return (
    <div className="foodMenuItem">
      <div className="foodMenuItem__imageWrapper">
        {" "}
        <img src={foodMenuItem.photo} />
      </div>
      <div className="foodMenuItem__info">
        <Title lineClamp={2} order={6} fw={500}>
          {foodMenuItem.foodName}
        </Title>

        <Flex justify={"space-between"}>
          <PriceDisplay
            discountPrice={foodMenuItem.discountPrice}
            price={foodMenuItem.price}
          />

          <ActionIcon
            aria-label="Add to list of order items"
            onClick={orderHandler}
            variant="light"
            sx={{ backgroundColor: "#FF6B00", color: "white" }}
          >
            {" "}
            <IconPlus size={50} stroke={2.2} />
          </ActionIcon>
        </Flex>
      </div>
    </div>
  );
}

export default FoodMenuItem;
