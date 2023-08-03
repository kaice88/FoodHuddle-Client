import { useEffect, useMemo, useState } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { Button, Flex, Image, Text, Title, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import isEmpty from 'lodash/isEmpty'
import { IconListCheck } from '@tabler/icons-react'

import ActionButton from './ActionButton'
import { PaymentActionColors, PaymentActions, PaymentStatusColors, PaymentStatuses, SessionStatuses } from '@/enums'
import StatusBadge from '@/components/StatusBadge'
import usePaymentSession from '@/hooks/usePaymentSession'
import ItemName from '@/components/ItemName'
import useSessionData from '@/hooks/useSessionData'

function EvidenceModal({ evidence, globalTheme }) {
  console.log(evidence.length)
  const openModal = () => modals.open({
    title: 'Image preview',
    centered: true,
    children: (
      <>
        {evidence.length === 0
          ? <Text style={{ textAlign: 'center', fontStyle: 'italic' }} color={globalTheme.colors.duck[0]}>No data found</Text>
          : <Flex wrap="wrap" gap="lg">
            {evidence.map((item, index) =>
              <Image
                key={index}
                // width={70}
                // height={70}
                src= {item}
                alt="Evidence"
                // onClick={handleImage}
              />)}
          </Flex>
        }
      </>
    ),
  })
  return (<Button size="xs" styles={theme => ({
    root: {
      backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.9),
      color: theme.colors.darkLavender[0],
      ...theme.fn.hover({
        backgroundColor: theme.fn.lighten(theme.colors.darkLavender[0], 0.7),
      }),
    },
  })} onClick={openModal}>Show</Button>)
}

function Table({ globalTheme, data, columns, isLoading }) {
  const table = useMantineReactTable({
    columns,
    data: !isEmpty(data) ? data : [],
    enableStickyHeader: true,
    enablePagination: false,
    enableTopToolbar: false,
    mantineTableBodyCellProps: () => ({
      style: {
        padding: '7px 16px 7px 16px',
        width: 'fit-content',
        borderBottom: `2px solid ${globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8)}`,
        textAlign: 'center',
      },
    }),
    mantineTableContainerProps: () => ({
      sx: {
        maxHeight: '300px',
      },
      style: {
        overflow: 'auto',
      },
      className: 'payment-checklist-table',
    }),
    mantineBottomToolbarProps: () => ({
      className: 'payment-checklist-table__bottom',
    }),
    mantineTopToolbarProps: () => ({
      className: 'payment-checklist-table__top',
    }),
    state: {
      isLoading,
    },
  })

  return <MantineReactTable table={table} />
}

function PaymentChecklistTable({ id }) {
  const [isLoading, setIsLoading] = useState(true)
  const globalTheme = useMantineTheme()
  const { sessionData } = useSessionData(id)
  const { changeStatusPaymentRequest, fetchPaymentChecklist, paymentChecklist, approveAllPaymentRequest } = usePaymentSession(id)

  useEffect(() => {
    const handlefetchPaymentChecklist = async () => {
      const res = await fetchPaymentChecklist.refetch()
      if (res.isSuccess)
        setIsLoading(false)
    }
    handlefetchPaymentChecklist()
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
          console.log(renderedCellValue)
          return (<>{renderedCellValue ? <EvidenceModal globalTheme={globalTheme} evidence={renderedCellValue}/> : '- - -' }</>)
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
