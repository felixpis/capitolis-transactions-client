import { Button, notification } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { PlusCircleOutlined, CompressOutlined } from '@ant-design/icons'
import * as transactionsApi from '../api/transactions';
import NewTransaction from '../components/NewTransaction';
import TransactionsList from '../components/TransactionsList';
import { compress } from '../services/compress';
import { exportToCsv } from '../services/export-csv';

const Root = styled.div`
  padding: 50px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  gap: 30px;
  height: calc(100vh - 100px);
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const Actions = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
  button {
    margin: 10px;
  }
  @media (max-width: 600px) {
    grid-column-end: 2;
  }
`;

const Transactions = () => {
  /** @type {[Transaction[], (items: Transaction[]) => void]} */
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    transactionsApi.getTransactions().then(data => setItems(data));
  }, [])

  const handleOpenAdd = () => {
    setShowAdd(true);
  }

  const handleCloseAdd = (transaction) => {
    if (transaction) {
      setItems([...items, transaction]);
      notification.success({
        message: `Added new ${transaction.amount < 0 ? 'Paying' : 'Receiving'} transaction`
      })
    }
    setShowAdd(false);
  }

  const handleCompress = () => {
    if (items.length === 0) {
      notification.warning({message: 'No transactions to compress'});
      return;
    }
    const result = compress(items);
    exportToCsv(result);
  }

  const payingTransactions = useMemo(() => items.filter(item => item.amount < 0).map(item => ({...item, amount: -item.amount})), [items]);
  const receivingTransactions = useMemo(() => items.filter(item => item.amount > 0), [items]);
  return (
    <Root>
      <Container>
        <TransactionsList title="Paying" items={payingTransactions} />
        <TransactionsList title="Receiving" items={receivingTransactions} />
        <Actions>
          <Button icon={<PlusCircleOutlined />} type="primary" shape="round" size="large" onClick={handleOpenAdd}>Add transaction</Button>
          <Button icon={<CompressOutlined />} type="primary" shape="round" size="large" onClick={handleCompress}>Compress transactions</Button>
        </Actions>
      </Container>
      <NewTransaction visible={showAdd} onClose={handleCloseAdd} />
    </Root>
  );
}

export default Transactions;
