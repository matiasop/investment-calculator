import Stacked from './stacked';
import PieChart from './pie';
import MyChart from './legend';

function App() {
  const calculator_info = {
    initial: 10000,
    years: 20,
    r: 0.07,
    contribution: 100,
  }
  return (
    <>
      <h1 className="header">Investment Calculator</h1>
      {/* <div className="menu" width="500px" height="400px">
        <table className="panel" width="100%">
          <tr>
            <td width="45%" valign="top">
              <form name="info_form">
                <table id="initial">
                  <tbody>
                    <tr>
                      <td width="180">Initial Amount</td>
                      <input type="text" value="10000"></input>
                    </tr>
                  </tbody>
                </table>
              </form>
            </td>
          </tr>
        </table>
      </div> */}
      <div className="App">
        <div className="graph-container">
          <Stacked {...calculator_info} />
          <PieChart {...calculator_info} />
        </div>
        <div className="pieLegend">
          <MyChart />
        </div>
      </div>
    </>
  )
}

export default App;