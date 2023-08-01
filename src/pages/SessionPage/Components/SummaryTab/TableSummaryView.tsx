import { useEffect, useMemo, useState } from 'react'
import { type MRT_ColumnDef } from 'mantine-react-table'
import { Flex, Text, useMantineTheme  } from '@mantine/core'
import { IconBowl, IconCoin } from '@tabler/icons-react'
import Table from '../../../../components/TableExpandable/TableComponent'
import { moneyFormat } from '@/utils/utility'
import useSummaryTab from '@/hooks/useSummaryTab'
import ItemName from '@/components/ItemName'
export interface FoodRowCover {
  id: number
  foodName: string
  total: number
  quantity: number
}

const ViewTable = ({ sessionId }) => {
  const globalTheme = useMantineTheme()
  const [tableViewData, setTableViewData] = useState([])
  const [childrenTableView, setChildrenTableView] = useState([])
  const { queryTableFoodOrderView } = useSummaryTab()
  const fetchQueryTableFoodOrderView = queryTableFoodOrderView(sessionId, setChildrenTableView, setTableViewData)

  useEffect(() => {
    const handlefetchTableFoodOrderView = async () => {
      await fetchQueryTableFoodOrderView.refetch()
    }
    handlefetchTableFoodOrderView()
  }, [])

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      fetchQueryTableFoodOrderView.refetch()
    }, 10000); 

    return () => clearInterval(pollingInterval);
  }, []);

  const columns = useMemo<MRT_ColumnDef<FoodRowCover>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '',
        size: 30,
        Cell: ({ renderedCellValue }) => (
          <Text fw={700} color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}>
            {renderedCellValue}
          </Text>
        ),
      },
      {
        accessorKey: 'foodName',
        size: 300,
        header: '',
        Cell: ({ renderedCellValue }) => (
          <Text  fw={600}
            fs={'16px'}
            color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.5)}
            style={{ textTransform: 'capitalize' }}>
          <ItemName name={renderedCellValue.name} picture={renderedCellValue.image}/>
        </Text>
        ),
      },
      {
        accessorKey: 'quantity',
        header: '',
        size: 100,
        Cell: ({ cell }) => (
          <Flex gap="sm" justify="center" align="center">
            <IconBowl
              size="1.3rem"
              color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.5)}
            />
            <Text
              fw={700}
              color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}
            >
              {cell.getValue<number>()}
            </Text>
          </Flex>
        ),
      },
      {
        accessorKey: 'total',
        header: '',
        size: 200,
        Cell: ({ cell }) => (
          <Flex gap="md" justify="flex-end" align="center" style={{ marginRight: '20px' }}>
            <IconCoin
              size="1.3rem"
              color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.5)}
            />
            <Text
              fw={700}
              color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)}
            >
              {`${moneyFormat(cell.getValue<number>(), 'VND', 'en-US', '')} đ`}
            </Text>
          </Flex>
        ),
      },
    ],
    [],
  )

  return <Table columns={columns} data={tableViewData} elements={childrenTableView} isLoading={fetchQueryTableFoodOrderView.isLoading} isTableGroupedByFood={true}/>
}

export default ViewTable
