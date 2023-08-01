import { useEffect, useMemo, useState } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { Avatar, Button, Flex, Image, Text, Title, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import isEmpty from 'lodash/isEmpty'

import ActionButton from '@/components/ActionButton'
import { PaymentActionColors, PaymentActions, PaymentStatusColors, PaymentStatuses } from '@/enums'
import StatusBadge from '@/components/StatusBadge'
import usePaymentSession from '@/hooks/usePaymentSession'


const EvidenceModal = ({evidence}) => {
  const openModal = () => modals.open({
    title: 'Image preview',
    centered: true,
    children: (
      <Flex wrap="wrap" gap="lg">
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

const Table = ({ id , globalTheme,data, columns, isLoading}) => {
  const table = useMantineReactTable({
    columns,
    data : !isEmpty(data) ? data : [],
    mantineTableHeadCellProps: () => ({
      sx: {
        backgroundColor: globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8),
      },
    }),
    state: {
      isLoading
    }
  })

  return <MantineReactTable table={table} />
}

const PaymentChecklistTable = ({id}) => {
  const [isLoading, setIsLoading] = useState(true)
  const globalTheme = useMantineTheme()
  const { changeStatusPaymentRequest, fetchPaymentChecklist , paymentChecklist, approveAllPaymentRequest} = usePaymentSession(id)
  useEffect(() => {
    const handlefetchPaymentChecklist = async () => {
      const res = await fetchPaymentChecklist.refetch()
      if(res.isSuccess) {
        setIsLoading(false)
      }
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
          (<Flex gap="sm" justify="flex-start" align="center" direction="row" >
            <Avatar src={renderedCellValue.photo} alt={renderedCellValue.name} radius="xl" size={35}/>
            <Text color={globalTheme.fn.darken(globalTheme.colors.orange[0], 0.1)} style={{ width: 'fix-content' }} >
              {renderedCellValue.name}
            </Text>
          </Flex>),
      },
      {
        accessorKey: 'note', 
        header: 'Payment Note',
      },
      {
        accessorKey: 'evidence',
        header: 'Evidence',
        size: 100,
        Cell: ({renderedCellValue}) => <EvidenceModal evidence={renderedCellValue}/>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: (value) => {
          return (
            <>{ Object.values(PaymentStatuses).indexOf(value.renderedCellValue) !== -1 ? <StatusBadge status={value.renderedCellValue} colorName={PaymentStatusColors[value.renderedCellValue]}/> : '- - -'}</>
           )
        },
      },
      {
        accessorKey: 'action',
        header: 'Action',
        Cell: ({ row }) => {
          const isDisabled = row.getValue('status') !== PaymentStatuses.PENDING
          const userId = row.getValue('user').id
          return (<Flex gap={10}>
            <ActionButton colorName={PaymentActionColors.APPROVE} value={PaymentActions.APPROVE} size="xs" disabled={isDisabled} handleOnClick={() => changeStatusPaymentRequest({ action: PaymentActions.APPROVE, userId})}/>
            <ActionButton colorName={PaymentActionColors.REJECT} value={PaymentActions.REJECT} size="xs" disabled={isDisabled} handleOnClick={() => changeStatusPaymentRequest({ action: PaymentActions.REJECT,userId })}/>
          </Flex>)
        },
      },
    ],
    [],
  )


  return (
  <div style={{padding:'10px 0'}}>
    <Flex justify='space-between' align='center'>
    <Title sx={() => ({ fontWeight: 500, fontSize: '20px' })} color={globalTheme.colors.duck[0]} py={10}>Payment Checklist</Title>
    <ActionButton value={PaymentActions.APPROVE_ALL} colorName={PaymentActionColors.APPROVE_ALL} handleOnClick={approveAllPaymentRequest} size='xs'/>
    </Flex>
    <Table id={id} globalTheme={globalTheme} columns={columns} data={paymentChecklist} isLoading={isLoading}/>
  </div>)
  
}
export default PaymentChecklistTable
