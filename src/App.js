import Stacked from './stacked';
import PieChart from './pie';
import MyChart from './legend';
import investment_calculator from './logic';
import React, { useState } from 'react';

function calculate_interest(data) {
  let sum_interest = 0;
  data.forEach((e) => {
    sum_interest += e.interest;
  });
  return sum_interest
}

function App() {
  const [initial, setInitial] = useState(10000);
  const [years, setYears] = useState(20);
  const [r, setR] = useState(0.07);
  const [contribution, setContribution] = useState(100);

  const calculator_info = {
    initial: initial,
    years: years,
    r: r,
    contribution: contribution,
  }

  let data = investment_calculator(Number(initial), Number(years), Number(r), Number(contribution));

  return (
    <>
      <h1 className="header">Investment Calculator</h1>
      <div className="App">
        <div className="graph-container">
          <Stacked className="stacked-chart" {...calculator_info} />
          <PieChart className="pie-chart" {...calculator_info} />
        </div>
        <div className="pieLegend">
          <MyChart />
        </div>
      </div>

      <div className="menu">
        <span className="menu-text">Initial Amount</span>
        <input className="menu-input" value={initial} type="text" onChange={(e) => setInitial(e.target.value)} />
      </div>

      <div className="menu">
        <span className="menu-text">Years</span>
        <input className="menu-input" value={years} type="text" onChange={(e) => setYears(e.target.value)} />
      </div>

      <div className="menu">
        <span className="menu-text">Return on Investment</span>
        <input className="menu-input" value={r} type="text" onChange={(e) => setR(e.target.value)} />
      </div>

      <div className="menu">
        <span className="menu-text">Monthly Contribution</span>
        <input className="menu-input" value={contribution} type="text" onChange={(e) => setContribution(e.target.value)} />
      </div>

      <div className="menu">
        <span className="menu-text results">Results</span>
      </div>

      <div className="menu">
        <span className="menu-text results">End Balance</span>
        <span className="results">{`$${(data[data.length - 1].end_balance).toFixed(2)}`}</span>
      </div>

      <div className="menu">
        <span className="menu-text">Initial Amount</span>
        <span>{`$${initial}`}</span>
      </div>

      <div className="menu">
        <span className="menu-text">Total Contributions</span>
        <span>{`$${(data[data.length - 1].end_principal)}`}</span>
      </div>

      <div className="menu">
        <span className="menu-text">Total Interest</span>
        <span>{`$${calculate_interest(data).toFixed(2)}`}</span>
      </div>

      <div className="footer"></div>
    </>
  )
}

export default App;