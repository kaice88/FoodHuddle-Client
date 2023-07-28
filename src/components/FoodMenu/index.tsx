import { ScrollArea } from "@mantine/core";

import { useParams } from "react-router-dom";
import useFoodStore from "@/store/foodStore";

import isEmpty from "lodash/isEmpty";
import { Loader, Flex } from "@mantine/core";

import useFood from "@/hooks/useFood";
import FoodMenuItem from "./FoodMenuItem";
import { divideElementsIntoGroups } from "@/utils";
import { Carousel } from "@mantine/carousel";

import { useMediaQuery } from "@mantine/hooks";
const { getMenuFoodData } = useFood();

function FoodMenu() {
  const { sessionId } = useParams();
  const currentShop = useFoodStore((state) => state.currentShop);
  const matches = useMediaQuery("(max-width: 686px)");
  const {
    data: menu,
    isLoading,
    error,
  } = getMenuFoodData(sessionId!, currentShop);

  if (isEmpty(currentShop)) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const menuGroups = divideElementsIntoGroups(menu!, 9);
  return (
    <Carousel
      orientation={matches ? "vertical" : "horizontal"}
      height={matches ? 400 : "auto"}
      align={"center"}
      className="menu"
      withIndicators
      breakpoints={[
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
    >
      {" "}
      {menuGroups.map((menu) => {
        return (
          <Carousel.Slide>
            {" "}
            <Flex
              align="center"
              justify="center"
              rowGap={24}
              columnGap={24}
              wrap="wrap"
            >
              {menu.map((item) => (
                <FoodMenuItem foodMenuItem={item} />
              ))}
            </Flex>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}

export default FoodMenu;
