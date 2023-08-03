import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { useMantineTheme } from '@mantine/core'
import ChildTable from './TableChildComponent'

const Table = ({ columns, data, elements, isLoading, isTableGroupedByFood }) => {
  const globalTheme = useMantineTheme()
  const table = useMantineReactTable({
    columns,
    data,
    renderDetailPanel: ({ row }) => {
      if (isTableGroupedByFood) {
        const element = elements.filter(item => row.original.foodName.name === item.foodName)
        return <ChildTable className="child-table" dataChildTable={element[0].elements} key={row.id}/>
      }
      else {
        return <ChildTable className="child-table" dataChildTable={elements[row.id]} key={row.id} isTableGroupedByFood={isTableGroupedByFood}/>
      }
    },
    mantineDetailPanelProps: props => (
      {
        style: {
          textAlign: 'center',
          padding: '5px',
        },
      }),
    enableColumnActions: false,
    enableSorting: false,
    enableTopToolbar: false,
    enablePagination: false,
    mantineTableBodyCellProps: ({ row }) => ({
      style: {
        padding: '10px',
      },
    }),
    mantineTableContainerProps: ({ table }) => ({
      sx: {
        maxHeight: '500px',
        padding: '3px',
      },
    }),
    enableBottomToolbar: false,
    state: { isLoading },
  })

  return <MantineReactTable table={table} />
}

export default Table
