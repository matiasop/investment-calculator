import React, { useState, useEffect } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { TooltipWithBounds, useTooltip, defaultStyles } from "@visx/tooltip";
import { localPoint } from '@visx/event';
import investment_calculator from './logic';

function PieChart({ initial, years, r, contribution }) {
  let investment = investment_calculator(initial, years, r, contribution);
  const [valor, setValue] = useState(initial);
  useEffect(() => { setValue(initial) }, [initial]);

  // find the total amount gained by interests
  let sum_interest = 0;
  investment.forEach((e) => {
    sum_interest += e.interest;
  });

  const final_money = initial + sum_interest + investment[investment.length - 1].end_principal;

  const name_initial = `${(initial / final_money).toFixed(1)}`;
  const name_interest = `${(sum_interest / final_money).toFixed(1)}`;
  const name_contributions = `${(investment[investment.length - 1].end_principal / final_money).toFixed(1)}`;
  const data = [
    { name: 'Initial', value: initial },
    { name: 'Interest', value: sum_interest },
    { name: 'Contributions', value: investment[investment.length - 1].end_principal }
  ]
  const perecentages = {
    'Initial': initial / final_money,
    'Interest': sum_interest / final_money,
    'Contributions': investment[investment.length - 1].end_principal / final_money
  }
  const value = (d) => d.value;
  const getNameFrequencyColor = scaleOrdinal({
    domain: data.map((d) => d.name),
    // range: [
    //   "rgba(93,30,91,1)",
    //   "rgba(93,30,91,0.8)",
    //   "rgba(93,30,91,0.6)",
    //   "rgba(93,30,91,0.4)"
    // ]
    range: ["#6baed6", "#9ecae1", "#3182bd"],
  });

  const pieSortValues = (a, b) => b - a;
  const width = 600;
  const height = 400;
  const radius = 100;
  const top = 300;
  const left = 200

  const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: "rgba(53,71,125,0.8)",
    color: "white",
    width: 140,
    height: 15,
    padding: 12
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
    tooltipOpen: false,
    // tooltipLeft: width / 3,
    // tooltipTop: height / 3,
    tooltipLeft: -1000,
    tooltipTop: -1000,
    tooltipData: "Move me with your mouse"
  });

  return (
    <>
      <div
        // ref={containerRef}
        // className="tooltip-example"
        style={{ width, height }}
        key={Math.random() - valor}
      // onPointerMove={handlePointerMove}
      >
        <>
          <TooltipWithBounds
            key={Math.random() - valor} // needed for bounds to update correctly
            left={tooltipLeft + 900}
            top={tooltipTop}
            style={tooltipStyles}
          >
            {tooltipData}
          </TooltipWithBounds>
        </>

        <svg width={width} height={height}>
          <Group top={top} left={left} key={Math.random() - value}>
            <Pie
              data={data}
              pieValue={value}
              outerRadius={radius}
              pieSortValues={pieSortValues}
              key={Math.random() - valor}
            >
              {(pie) => {
                return pie.arcs.map((arc, index) => {
                  const { name } = arc.data;
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                  const arcPath = pie.path(arc);
                  const arcFill = getNameFrequencyColor(name);
                  return (
                    <g key={`arc-${name}-${index}`}>
                      <path
                        d={arcPath}
                        fill={arcFill}
                        onMouseEnter={(event) => {
                          const toolText = `${name} \n ${(perecentages[name] * 100).toFixed(2)}%`;
                          const coords = localPoint(event.target.ownerSVGElement, event);
                          showTooltip({ tooltipLeft: coords.x - 200, tooltipTop: coords.y, tooltipData: toolText, tooltipOpen: false });
                          // showTooltip({ tooltipLeft: centroidX + width / 3, tooltipTop: centroidY + height, tooltipData: toolText, tooltipOpen: false });
                        }}
                        onMouseLeave={(event) => {
                          // hideTooltip();
                          // move the tooltip far away so no one can see it
                          updateTooltip({ tooltipLeft: -1000, tooltipTop: -1000, tooltipData: "", tooltipOpen: true });
                        }}
                      />
                      {hasSpaceForLabel && (
                        <text
                          x={centroidX}
                          y={centroidY}
                          dy=".33em"
                          fill="#ffffff"
                          fontSize={22}
                          textAnchor="middle"
                          pointerEvents="none"
                        >
                          {/* Comment the line below so the name won't be displayed */}
                          {/* {arc.data.name} */}
                        </text>
                      )}
                    </g>
                  );
                });
              }}
            </Pie>
          </Group>
        </svg>
      </div>
    </>
  );
}

export default PieChart;