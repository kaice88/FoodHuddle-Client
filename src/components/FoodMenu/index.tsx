import { useParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { Loader, Flex } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

import useFood from "@/hooks/useFood";
import useFoodStore from "@/store/foodStore";
import FoodMenuItem from "./FoodMenuItem";
import { divideElementsIntoGroups } from "@/utils";

const { getMenuFoodData } = useFood();

function FoodMenu() {
  const { sessionId } = useParams();
  const currentShop = useFoodStore((state) => state.currentShop);
  const matchesSM = useMediaQuery("(max-width: 686px)");
  const matchesMD = useMediaQuery("(max-width:1283.5px)");

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

  const menuGroups = matchesSM
    ? divideElementsIntoGroups(menu!, 3)
    : matchesMD
    ? divideElementsIntoGroups(menu!, 6)
    : divideElementsIntoGroups(menu!, 9);
  return (
    <Carousel
      orientation={matchesSM ? "vertical" : "horizontal"}
      height={matchesSM ? 420 : "auto"}
      align={"center"}
      className="menu"
      withIndicators
    >
      {" "}
      {menuGroups.map((menu) => {
        return (
          <Carousel.Slide key={Math.random().toString(36)}>
            {" "}
            <Flex
              key={Math.random().toString(36)}
              align="center"
              justify="center"
              rowGap={24}
              columnGap={24}
              wrap="wrap"
            >
              {menu.map((item) => (
                <FoodMenuItem
                  key={item.id + Math.random().toString(36)}
                  foodMenuItem={item}
                />
              ))}
            </Flex>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}

export default FoodMenu;
