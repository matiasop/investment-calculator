import Stacked from './stacked';
import PieChart from './pie';
import MyChart from './legend';
import React, { useState } from 'react';

function App() {
  const [finitial, setFinitial] = useState(10000);
  const [fyears, setfyears] = useState(20);
  const [fr, setfr] = useState(0.07);
  const [fcontribution, setfcontribution] = useState(100);

  const calculator_info = {
    initial: finitial,
    years: 20,
    r: 0.07,
    contribution: 100,
  }

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
        <input className="menu-input" value={finitial} type="text" onChange={(e) => setFinitial(e.target.value)} />
        <p>{finitial}</p>
      </div>
    </>
  )
}

export default App;