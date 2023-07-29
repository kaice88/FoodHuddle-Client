import { Flex, Grid, Image, Paper, Text, Title, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'

const listBillImages = ['http://surl.li/htspb', 'http://surl.li/htspb', 'http://surl.li/htspb', 'http://surl.li/htspb']
const FeeItem = ({ title, value, color }) => {
  return (
    <Flex gap="lg" justify="space-between" wrap="wrap">
      <Text color={color} fw={500}>
        {`${title}: `}
      </Text>
      <Text>{value}</Text>
    </Flex>
  )
}

const BillItem = ({ srcImage }) => {
  const handleImage = () => modals.open({
    title: 'Image preview',
    centered: true,
    children: (
      <Image
        src= {srcImage}
        alt="Bill image"
        onClick={handleImage}
      />
    ),

  })
  return (
  // <span style={{ marginRight: '10px' }}>
    <Image
      width={70}
      height={70}
      src= {srcImage}
      alt="Bill image"
      onClick={handleImage}
    />
  //  </span>
  )
}

export default function FeeInfo() {
  const theme = useMantineTheme()

  return (
    <Paper shadow="md" p="md" className="fee-info" sx={{ height: '20%' }} >
      <Grid grow gutter="xl">
        <Grid.Col sm={12} md={6}>
          <Title sx={() => ({ fontWeight: 700, fontSize: '20px' })} color={theme.colors.duck[0]}>Fees</Title>
          <FeeItem title="Shipping fee" value="100.055500" color={theme.colors.duck[0]}></FeeItem>
          <FeeItem title="Discount" value="100.06666600" color={theme.colors.duck[0]}></FeeItem>
          <FeeItem title="Another fee" value="100.000" color={theme.colors.duck[0]}></FeeItem>
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <Title sx={() => ({ fontWeight: 700, fontSize: '20px' })} color={theme.colors.duck[0]}>Bill</Title>
          <Flex wrap="wrap" gap="lg">
            {listBillImages.map((item, index) => <BillItem key={index} srcImage ={item} ></BillItem>)}
          </Flex>
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
