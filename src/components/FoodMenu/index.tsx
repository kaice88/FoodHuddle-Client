import { useParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { Loader, Flex, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { v4 as uuidv4 } from "uuid";

import FoodMenuItem from "./FoodMenuItem";
import { divideElementsIntoGroups } from "@/utils";
import useMenu from "@/hooks/useMenu";

function FoodMenu() {
  const { sessionId } = useParams();
  const { data: menu, isLoading, error } = useMenu(sessionId!);

  const matchesSM = useMediaQuery("(max-width: 686px)");
  const matchesMD = useMediaQuery("(max-width:1283.5px)");
  const matchesXL = useMediaQuery("(min-width:1587.5px)");
  const matchesXXL = useMediaQuery("(min-width:1700px)");

  if (isLoading) {
    return <Loader />;
  }

  const menuGroups = matchesSM
    ? divideElementsIntoGroups(menu!, 3)
    : matchesMD
    ? divideElementsIntoGroups(menu!, 6)
    : matchesXXL
    ? divideElementsIntoGroups(menu!, 15)
    : matchesXL
    ? divideElementsIntoGroups(menu!, 12)
    : divideElementsIntoGroups(menu!, 9);

  return (
    <>
      <Title order={3} color="orange">
        Ăn uống gì đây ta?
      </Title>
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
            <Carousel.Slide key={uuidv4()}>
              {" "}
              <Flex
                key={uuidv4()}
                align="center"
                justify="center"
                rowGap={24}
                columnGap={24}
                wrap="wrap"
              >
                {menu.map((item) => (
                  <FoodMenuItem key={uuidv4()} foodMenuItem={item} />
                ))}
              </Flex>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </>
  );
}

export default FoodMenu;
