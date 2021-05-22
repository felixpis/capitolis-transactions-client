import { Button, notification } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import * as transactionsApi from './api/transactions';
import './App.css';
import NewTransaction from './components/NewTransaction';
import TransactionsList from './components/TransactionsList';

const Root = styled.div`
  margin: 50px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`;

function App() {
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

  const payingTransactions = useMemo(() => items.filter(item => item.amount < 0).map(item => ({...item, amount: -item.amount})), [items]);
  const receivingTransactions = useMemo(() => items.filter(item => item.amount > 0), [items]);
  return (
    <Root>
      <Container>
        <TransactionsList title="Paying" items={payingTransactions} />
        <TransactionsList title="Receiving" items={receivingTransactions} />
      </Container>
      <div>
        <Button type="primary" shape="round" size="large" onClick={handleOpenAdd}>Add transaction</Button>
      </div>
      <NewTransaction visible={showAdd} onClose={handleCloseAdd} />
    </Root>
  );
}

export default App;
