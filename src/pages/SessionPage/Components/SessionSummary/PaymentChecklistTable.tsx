import { useEffect, useMemo, useState } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { Button, Flex, Title, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import isEmpty from 'lodash/isEmpty'
import { IconListCheck } from '@tabler/icons-react'

import ActionButton from './ActionButton'
import ImageCarouselModal from './ImageCarouselModal'
import { PaymentActionColors, PaymentActions, PaymentStatusColors, PaymentStatuses, SessionStatuses } from '@/enums'
import StatusBadge from '@/components/StatusBadge'
import usePaymentSession from '@/hooks/usePaymentSession'
import ItemName from '@/components/ItemName'

function EvidenceModal({ evidence }) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <ImageCarouselModal opened={opened} close={close} images={evidence}/>
      <Button size="xs" styles={theme => ({
        root: {
          backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.9),
          color: theme.colors.darkLavender[0],
          ...theme.fn.hover({
            backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.7),
          }),
        },
      })} onClick={open}>Show</Button>
    </>
  )
}

function Table({ data, columns, isLoading }) {
  const table = useMantineReactTable({
    columns,
    data: !isEmpty(data) ? data : [],
    enableStickyHeader: true,
    enablePagination: false,
    enableTopToolbar: false,
    enableColumnActions: false,
    enableSorting: false,
    mantineDetailPanelProps: () => (
      {
        style: {
          textAlign: 'center',
          padding: '5px',
        },
      }),

    mantineTableBodyCellProps: () => ({
      style: {
        padding: '10px',
        textAlign: 'center',
      },
    }),
    mantineTableContainerProps: () => ({
      sx: {
        maxHeight: '500px',
        padding: '3px',
      },
      className: 'payment-checklist-table',
    }),
    enableBottomToolbar: false,
    state: { isLoading },
  })

  return <MantineReactTable table={table} />
}

function PaymentChecklistTable({ id, sessionData }) {
  const [isLoading, setIsLoading] = useState(true)
  const globalTheme = useMantineTheme()
  const { changeStatusPaymentRequest, fetchPaymentChecklist, paymentChecklist, approveAllPaymentRequest } = usePaymentSession(id)

  useEffect(() => {
    const handlefetchPaymentChecklist = async () => {
      const res = await fetchPaymentChecklist.refetch()
      if (res.isSuccess)
        setIsLoading(false)
    }
    handlefetchPaymentChecklist()
    const pollingInterval = setInterval(() => {
      fetchPaymentChecklist.refetch()
    }, 10000)
    return () => clearInterval(pollingInterval)
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'user',
        header: 'Joiner',
        size: 200,
        Cell: ({ renderedCellValue }) =>
          <ItemName name={renderedCellValue.name} picture={renderedCellValue.photo}/>,
      },
      {
        accessorKey: 'note',
        header: 'Payment Note',
      },
      {
        accessorKey: 'evidence',
        header: 'Evidence',
        size: 100,
        Cell: ({ renderedCellValue }) => {
          return (<>{!isEmpty(renderedCellValue) ? <EvidenceModal evidence={renderedCellValue}/> : '- - -' }</>)
        }
        ,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: (value) => {
          return (
            <>{ Object.values(PaymentStatuses).includes(value.renderedCellValue) ? <StatusBadge status={value.renderedCellValue} colorName={PaymentStatusColors[value.renderedCellValue]}/> : '- - -'}</>
          )
        },
      },
      {
        accessorKey: 'action',
        header: 'Action',
        Cell: ({ row }) => {
          const isDisabled = row.getValue('status') !== PaymentStatuses.PENDING
          const userId = row.getValue('user').id
          return (<Flex gap={10} justify="center" align="center">
            <ActionButton colorName={PaymentActionColors.APPROVE} value={PaymentActions.APPROVE} size="xs" disabled={isDisabled} handleOnClick={() => changeStatusPaymentRequest({ action: PaymentActions.APPROVE, userId })}/>
            <ActionButton colorName={PaymentActionColors.REJECT} value={PaymentActions.REJECT} size="xs" disabled={isDisabled} handleOnClick={() => changeStatusPaymentRequest({ action: PaymentActions.REJECT, userId })}/>
          </Flex>)
        },
      },
    ],
    [],
  )

  return (
    <div style={{ padding: '10px 0' }}>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap="xs">
          <IconListCheck size="1.5rem" color={globalTheme.colors.duck[0]}/>
          <Title sx={() => ({ fontWeight: 500, fontSize: '18px' })} color={globalTheme.colors.duck[0]} py={10}>Payment Checklist</Title>
        </Flex>
        {sessionData?.status !== SessionStatuses.FINISHED && <ActionButton value={PaymentActions.APPROVE_ALL} colorName={PaymentActionColors.APPROVE_ALL} handleOnClick={approveAllPaymentRequest} size="xs"/> }
      </Flex>
      <Table globalTheme={globalTheme} columns={columns} data={paymentChecklist} isLoading={isLoading}/>
    </div>)
}
export default PaymentChecklistTable
