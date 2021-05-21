import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

/**
 * List of transactions
 * @param {object} param0 
 * @param {string} param0.title
 * @param {[]} param0.items
 * @returns 
 */
const TransactionsList = ({title, items}) => {
  return (
    <div>
      <h2>
        {title}
      </h2>
      <Table dataSource={items} bordered={true} rowKey="_id" pagination={false}>
        <Table.Column title="Counterparty name" dataIndex="counterParty" />
        <Table.Column title="Amount" dataIndex="amount" render={text => `$${text}`} />
      </Table>
    </div>
  )
}

TransactionsList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
}

export default TransactionsList
