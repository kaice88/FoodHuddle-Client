import { ActionIcon, Flex, Group, Box, Text, Title } from "@mantine/core";
import React from "react";
import type { MenuItem } from "@/types/food";
import { IconPlus } from "@tabler/icons-react";
import { moneyFormat } from "@/utils";
interface FoodItemProps {
  foodMenuItem: MenuItem;
}

function FoodMenuItem({ foodMenuItem }: FoodItemProps) {
  return (
    <div className="foodMenuItem">
      <div className="foodMenuItem__imageWrapper">
        {" "}
        <img src={foodMenuItem.photo} />
      </div>
      <div className="foodMenuItem__info">
        <Box w={200}>
          {" "}
          <Title lineClamp={2} order={6} fw={500}>
            {foodMenuItem.foodName}
          </Title>
        </Box>
        <Flex justify={"space-between"}>
          <Text size="md" style={{ color: "#FF6B00" }}>
            {moneyFormat(
              foodMenuItem.discountPrice || foodMenuItem.price,
              "VND",
              "vi-VN"
            )}
          </Text>
          <ActionIcon
            aria-label="Add to list of order items"
            variant="filled"
            color="red"
          >
            {" "}
            <IconPlus size={"1rem"} />
          </ActionIcon>
        </Flex>
      </div>
    </div>
  );
}

export default FoodMenuItem;
