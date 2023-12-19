
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Wrapper from './components/Wrapper.jsx';
import Header from './components/Header.jsx';
import TransectionTable from './components/TransectionTable.jsx';
import Statistics from './components/Statistics.jsx';
import BarChart from './components/BarChart.jsx';
import PieChart from './components/PieChart.jsx';

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <TransectionTable />
        <Statistics />
        <BarChart />
        <PieChart />
      </Wrapper>
    </>
  );
}

export default App;
