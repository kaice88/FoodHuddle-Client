import { Flex, Paper, Text } from '@mantine/core';

import { useMantineTheme } from '@mantine/core';

const FeeItem = ({ title, value }) => {
  const theme = useMantineTheme();

  return (
    <Flex gap="lg">
      <Text color={theme.colors.duck[0]} fw={700}>
        {`${title}: `}
      </Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export default function FeeInfo() {
  return (
    <Paper shadow="xs" p="md" className="fee-info">
      <FeeItem title="Shipping fee" value="100.000"></FeeItem>
      <FeeItem title="Discount" value="100.000"></FeeItem>
      <FeeItem title="Another fee" value="100.000"></FeeItem>
    </Paper>
  );
}
