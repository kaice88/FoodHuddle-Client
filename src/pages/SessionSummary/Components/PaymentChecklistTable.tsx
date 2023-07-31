import { useMemo } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { Avatar, Button, Flex, Image, Text, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'

import ActionButton from '@/components/ActionButton'
import { PaymentActionColors, PaymentActions, PaymentStatusColors, PaymentStatuses } from '@/enums'
import StatusBadge from '@/components/StatusBadge'
import { moneyFormat } from '@/utils/utility'
import usePaymentSession from '@/hooks/usePaymentSession'

const listBillImages = ['http://surl.li/htspb', 'http://surl.li/htspb']
const EvidenceModal = () => {
  const openModal = () => modals.open({
    title: 'Image preview',
    centered: true,
    children: (
      <Flex wrap="wrap" gap="lg">
        {listBillImages.map((item, index) =>
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

const data = [
  {
    id: 1,
    user: {
      email: 'kimchi@gmal.com',
      googleId: 12345,
      name: 'Nguyen Thi Kim Chi',
      photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
    },
    paymentStatus: 'APPROVED',
    paymentAmount: 5055555,
    note: 'Payment processed successfully.',
    evidence: 'ji',
  },
  {
    id: 2,
    user: {
      email: 'kimchi@gmal.com',
      googleId: 12345,
      name: 'Kim Chi',
      photo: 'https://lh3.googleusercontent.com/a/AAcHTteJ-0ycB1Gz-fYDFq3OFKcet17Br5M4Mw0c2JGm3n4jUA=s96-c',
    },
    paymentStatus: 'REJECTED',
    paymentAmount: 50,
    note: 'Payment processed successfully.',
    evidence: 'ji',
  },
]

const PaymentChecklistTable = ({ id }) => {
  const globalTheme = useMantineTheme()
  const { changeStatusPaymentRequest } = usePaymentSession(id)
  const columns = useMemo(
    () => [
      {
        accessorKey: 'user', // access nested data with dot notation
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
        accessorKey: 'paymentAmount',
        header: 'Amount',
        size: 100,
        Cell: ({ renderedCellValue }) => `${moneyFormat(renderedCellValue, 'VND', 'en-US', '')} đ`,
      },
      {
        accessorKey: 'note', // normal accessorKey
        header: 'Payment Note',
      },
      {
        accessorKey: 'evidence',
        header: 'Evidence',
        size: 100,
        Cell: () => <EvidenceModal/>,
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Status',
        size: 100,
        Cell: ({ renderedCellValue }) => {
          return (<StatusBadge status={renderedCellValue} colorName={PaymentStatusColors[renderedCellValue]}/>)
        },
      },
      {
        accessorKey: 'action',
        header: 'Action',
        Cell: ({ row }) => {
          const paymentStatus = row.getValue('paymentStatus')
          const isDisbled = paymentStatus !== PaymentStatuses.PENDING
          return (<Flex gap={10}>
            <ActionButton colorName={PaymentActionColors.APPROVE} value={PaymentActions.APPROVE} size="xs" disabled={isDisbled} handleOnClick={() => changeStatusPaymentRequest({ action: PaymentActions.APPROVE })}/>
            <ActionButton colorName={PaymentActionColors.REJECT} value={PaymentActions.REJECT} size="xs" disabled={isDisbled} handleOnClick={() => changeStatusPaymentRequest({ action: PaymentActions.REJECT })}/>
          </Flex>)
        },
      },
    ],
    [],
  )

  const table = useMantineReactTable({
    columns,
    data,
    mantineTableHeadCellProps: () => ({
      sx: {
        backgroundColor: globalTheme.fn.lighten(globalTheme.colors.darkLavender[0], 0.8),
      },
    }),
  })

  return <MantineReactTable table={table} />
}

export default PaymentChecklistTable
