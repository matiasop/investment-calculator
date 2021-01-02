import React, { useState, useEffect } from "react";
import { Group } from "@visx/group";
import { AreaStack, Line } from "@visx/shape";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { scaleTime, scaleLinear, scaleOrdinal } from "@visx/scale";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { bisector } from 'd3-array';
import { localPoint } from '@visx/event';
import investment_calculator from './logic';

const Stacked = ({ initial, years, r, contribution }) => {
  const [value, setValue] = useState(initial);
  useEffect(() => { setValue(initial) }, [initial]);

  // Data and keys
  // let data = investment_calculator(initial, years, r, contribution);
  let data = investment_calculator(value, years, r, contribution);
  const keys = ["start_principal", "interest", "start_balance"];
  // Data accesor
  const x = d => new Date(d.date);

  // Scales
  const xScale = scaleTime({
    domain: [x(data[0]), x(data[data.length - 1])]
  });
  const yScale = scaleLinear({
    // domain: [0, 160]
    domain: [0, data[data.length - 1].end_balance * 2]
  });
  const zScale = scaleOrdinal({
    range: ["#3182bd", "#6baed6", "#9ecae1"],
    // range: ["green", "orange", "red"],
    domain: keys
  });

  // Dimensions
  const width = 600;
  const height = 450;
  const margin = { top: 10, bottom: 40, left: 40, right: 10 };
  const widthTT = 130;
  const heightTT = 50;
  const paddingTT = 12;

  // ToolTip
  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: "rgba(53,71,125,0.8)",
    color: "white",
    width: widthTT,
    height: heightTT,
    padding: paddingTT,
  };

  const {
    showTooltip,
    hideTooltip,
    updateTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0
  } = useTooltip({
    // Initial tooltip state
    tooltipOpen: true,
    // tooltipLeft: width / 3,
    // tooltipTop: height / 3,
    tooltipLeft: -1000,
    tooltipTop: -1000,
    tooltipData: "Move me with your mouse"
  });
  //  Accessors
  const getDate = (d) => new Date(d.date);
  // const getDataValue = (d) => d.Group1 + d.Group2 + d.Group3;
  const getDataValue = (d) => d.start_principal + d.interest + d.start_balance;
  const bisectDate = bisector(d => new Date(d.date)).left;

  // Scales
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <div
      style={{ width, height }}
      key={Math.random() - value}
    >
      <p>{value}</p>
      <TooltipWithBounds
        key={Math.random() - value} // needed for bounds to update correctly
        left={tooltipLeft}
        top={tooltipTop}
        style={tooltipStyles}
      >
        {tooltipData}
      </TooltipWithBounds>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left} key={Math.random() - value}>
          <AreaStack
            key={Math.random() - value}
            keys={keys}
            data={data}
            stroke="white"
            strokeWidth={2}
            x={d => xScale(x(d.data))}
            y0={d => {
              return yScale(d[0])
            }}
            // y1={d => yScale(d[0] + d[1])}
            y1={d => yScale(d[1])}
            // color={(key, index) => zScale(keys[index])}
            color={d => zScale(d)}
            // Move the ToolTip
            onMouseMove={(event) => {
              const { x } = localPoint(event) || { x: 0 };
              const x0 = xScale.invert(x);
              const index = bisectDate(data, x0, 1);
              const d0 = data[index - 1];
              const d1 = data[index];
              let d = d0;
              if (d1 && getDate(d1)) {
                d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
              }

              // info on the tooltip
              // let information = `G1: ${d.Group1} \n G2: ${d.Group2} \n G3: ${d.Group3} \n Sum: ${d.Group1 + d.Group2 + d.Group3}`;
              // let information = `G1: ${d.start_principal} \n G2: ${d.interest} \n G3: ${d.start_balance} \n Sum: ${d.start_principal + d.interest + d.start_balance}`;
              let information = `Principal: ${d.start_principal.toFixed(2)} \n Interest: ${d.interest.toFixed(2)} \n Balance: ${d.start_balance.toFixed(2)}`;
              showTooltip({ tooltipLeft: x, tooltipTop: yScale(getDataValue(d)), tooltipData: information, tooltipOpen: true });
            }}
            // Hide the toolTip
            onMouseLeave={(event) => {
              showTooltip({ tooltipLeft: -1000, tooltipTop: -1000, tooltipData: "", tooltipOpen: true })
            }}
          />
          <Line
            key={Math.random() - value}
            from={{ x: tooltipLeft - widthTT / 2, y: margin.top }}
            to={{ x: tooltipLeft - widthTT / 2, y: margin.top + height }}
            // stroke={'#75daad'}
            stroke={'orange'}
            strokeWidth={2}
            // pointerEvents="none"
            strokeDasharray="5,2"
          />
          <AxisLeft scale={yScale} key={Math.random() - value} />
          <AxisBottom top={yMax} scale={xScale} key={Math.random() - value} />
        </Group>
      </svg>
    </div>
  );
};

export default Stacked;
