import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import faker from "faker";
import chroma from "chroma-js";

import "./styles.css";
import DrilldownPie from "./DrilldownPie";

function generateData(level, prevIndex, color) {
  const N = d3.randomUniform(3, 10)();
  const colors = color
    ? d3.range(N).map(i =>
        chroma(color)
          .brighten(i * 0.1)
          .hex()
      )
    : d3.schemePaired;

  return d3.range(N).map(i => ({
    value: Math.abs(d3.randomNormal()()),
    id: `${level}-${i}`,
    level: level,
    index: i,
    prevIndex: prevIndex,
    name: faker.internet.userName(),
    color: colors[i],
    children: level > 0 ? generateData(level - 1, i, colors[i]) : []
  }));
}

function App() {
  const data = generateData(4);
  console.log(data);

  return (
    <div className="App">
      <h1>Drilldown piechart in React & D3</h1>
      <svg width="500" height="500">
        <DrilldownPie data={data} x={250} y={150} />
      </svg>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
