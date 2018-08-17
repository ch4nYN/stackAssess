import './app.css';
import React, { Component } from 'react';
import { Sparklines, SparklinesCurve} from 'react-sparklines';
import NumberFormat from 'react-number-format';

var datas = require('./data.json');

class App extends Component {
  renderChart(datas) {
    return datas.map(data => {
      return (
        <tr key={data.weekEnding}>
          <td>{data.weekEnding}</td>
          <td><NumberFormat value={data.retailSales} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
          <td><NumberFormat value={data.wholesaleSales} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
          <td>{data.unitsSold}</td>
          <td><NumberFormat value={data.retailerMargin} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
        </tr>
      );
    })
  }
  render() {
    var points = [];
    datas[0].sales.map(sale => {
      return points.push(sale);
    });
    var retails = [];
    var wholesales = [];
    points.map(point => {
      return retails.push(point.retailSales);
    });
    points.map(point => {
      return wholesales.push(point.wholesaleSales)
    })
    return(
      <div>
        <div className="outer">
          <p>SHARK NINJA: Jan 2016 - March 2016</p>
          <p style={{marginTop:'-10px', color:'lightblue'}}>retail sales</p>
          <p style={{marginTop:'-10px', color: 'grey'}}>wholesale sales</p>
    
          <div className="retail">
            <Sparklines data={retails} limit={12} margin={5} min={0} max={1000000}>
              <SparklinesCurve style={{ fill: "none" }} color={"lightblue"} />
            </Sparklines>
          </div>
          <div className="wholesale">
            <Sparklines data={wholesales} limit={12} margin={5} min={0} max={1000000}>
              <SparklinesCurve color={"grey"} style={{ fill: "none" }} />
            </Sparklines>
          </div>
        </div>
        <div className="chart">
          <table style={{width: '80%', fontSize: '14px'}}>
            <thead>
              <tr>
                <th>WEEK ENDING</th>
                <th>RETAIL SALES</th>
                <th>WHOLESALE SALES</th>
                <th>UNITS SOLD</th>
                <th>RETAIL MARGIN</th>
              </tr>
            </thead>
            <tbody>
              {this.renderChart(points)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default App;