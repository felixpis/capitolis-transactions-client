import styled from 'styled-components';
import './App.css';
import TransactionsList from './components/TransactionsList';

const Container = styled.div`
  margin: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`;

function App() {
  return (
    <Container>
      <TransactionsList title="Paying" items={[]} />
      <TransactionsList title="Receiving" items={[]} />
    </Container>
  );
}

export default App;
