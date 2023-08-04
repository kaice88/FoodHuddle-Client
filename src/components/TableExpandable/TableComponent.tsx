import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import ChildTable from './TableChildComponent'

const Table = ({ columns, data, elements, isLoading, isTableGroupedByFood }) => {
  const table = useMantineReactTable({
    columns,
    data,
    renderDetailPanel: ({ row }) => {
      if (isTableGroupedByFood) {
        const element = elements.filter(item => row.original.foodName.name === item.foodName)
        return <ChildTable className="child-table" dataChilTable={element[0].elements} key={row.id}/>
      }
      else {
        return null // Return null or any other fallback content if not grouped by food
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
      className: 'table-view-expandable',
    }),
    enableBottomToolbar: false,
    state: { isLoading },
  })

  return <MantineReactTable table={table} />
}

export default Table
