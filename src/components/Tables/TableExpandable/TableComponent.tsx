import React from 'react'
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
        const element = elements.filter(item => row.original.foodName === item.foodName)
        return <ChildTable className="child-table" dataChilTable={element[0].elements} key={row.id}/>
      }
      else {
        return <ChildTable className="child-table" dataChilTable={elements[row.id]} key={row.id}/>
      }
    },
    mantineDetailPanelProps: () => (
      {
        style: {
          textAlign: 'center',
          padding: '5px',
          border: '2px solid white',

        },
        sx: {
          padding: '0px',
        },
      }),
    enableColumnActions: false,
    enableSorting: false,
    enableTopToolbar: false,
    enablePagination: false,
    mantineTableBodyCellProps: ({ row }) => ({
      style: {
        backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8)}`,
        borderBottom: '2px solid white',
        padding: '10px',
      },
    }),
    mantineTableContainerProps: ({ table }) => ({
      sx: {
        maxHeight: '500px',
        backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.9)}`,
        padding: '3px',

      },
    }),
    enableBottomToolbar: false,
    mantineTableBodyRowProps: ({ table }) => ({
      style: {
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        padding: '0px',
        backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 1)}`,

      },

    }),
    mantineTableHeadCellProps: ({ table }) => ({
      style: {
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.96)}`,
        padding: '10px',
      },
    }),
    mantineExpandAllButtonProps: ({ table }) => ({
      style: {
        align: 'left',
        color: `${globalTheme.colors.darkLavender[0]}`,
        scale: '0.7',
      },
      sx: {
        'backgroundColor': `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.6)}`,
        '&:hover': {
          backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.5)}`,
        },
      },
    }),
    mantineExpandButtonProps: ({ row }) => ({
      style: {
        scale: '0.7',
        align: 'left',
        color: `${globalTheme.colors.darkLavender[0]}`,
      },
      sx: {
        'backgroundColor': `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.6)}`,
        '&:hover': {
          backgroundColor: `${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.5)}`,
        },
      },
    }),
    mantinePaperProps: ({ table }) => ({
      style: {
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
      },
    }),
    state: { isLoading },
  })

  return <MantineReactTable table={table} />
}

export default Table
