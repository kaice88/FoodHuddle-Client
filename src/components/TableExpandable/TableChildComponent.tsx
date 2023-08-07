import { Table, Text, useMantineTheme } from '@mantine/core'
import isEmpty from 'lodash/isEmpty'
import MenuOptions from '../MenuOptions'
import ItemName from '../ItemName'
import { moneyFormat } from '../../utils'

function ChildTable({ className, dataChildTable, isTableGroupedByFood = true }) {
  const globalTheme = useMantineTheme()

  const rows = !isEmpty(dataChildTable) && dataChildTable.map((element, index) => {
    return (
      <tr key={`${index}-${element.name.name}`}>
        <td><Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)} >
          {isTableGroupedByFood ? <ItemName name={element.name.name} picture={element.name.photo}/> : <ItemName name={element.name} picture={element.photo}/>}
        </Text></td>
        <td>
          {moneyFormat(element.originPrice, 'VND', 'en-US', '')} đ
        </td>
        <td>
          {moneyFormat(element.actualPrice, 'VND', 'en-US', '')} đ
        </td>
        <td>
          <MenuOptions options={element.options}/>
        </td>
        <td
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            maxWidth: '150px',
          }}
        >
          <div style={{ overflowY: 'auto', maxHeight: '100px' }}><Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)}>
            {element.note}
          </Text></div>
        </td>
        <td><Text color={globalTheme.fn.darken(globalTheme.colors.duck[0], 0.3)}>
          {element.quantity}
        </Text></td>
      </tr>
    )
  })
  const tablechildren = (
    <Table className={className} striped highlightOnHover>
      <thead className="head-title">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Actual Price</th>
          <th>Options</th>
          <th>Note</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  )
  return tablechildren
}

export default ChildTable
