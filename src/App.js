import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import * as transactionsApi from './api/transactions';
import './App.css';
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
  useEffect(() => {
    transactionsApi.getTransactions().then(data => setItems(data));
  }, [])

  const payingTransactions = useMemo(() => items.filter(item => item.amount < 0).map(item => ({...item, amount: -item.amount})), [items]);
  const receivingTransactions = useMemo(() => items.filter(item => item.amount > 0), [items]);
  return (
    <Root>
      <Container>
        <TransactionsList title="Paying" items={payingTransactions} />
        <TransactionsList title="Receiving" items={receivingTransactions} />
      </Container>
    </Root>
  );
}

export default App;
