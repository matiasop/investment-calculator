import {
  Legend,
  LegendLinear,
  LegendQuantile,
  LegendOrdinal,
  LegendSize,
  LegendThreshold,
  LegendItem,
  LegendLabel,
} from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';

const legendGlyphSize = 15;

const ordinalColorScale = scaleOrdinal({
  domain: ['Initial Amount', 'Interest Gained', 'Monthly Contributions'],
  range: ["#6baed6", "#9ecae1", "#3182bd"],
});

function MyChart() {
  return (
    <div>
      <LegendOrdinal scale={ordinalColorScale} labelFormat={label => `${label}`}>
        {labels => (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {labels.map((label, i) => (
              <LegendItem
                key={`legend-quantile-${i}`}
                margin="0 5px"
              // onClick={() => {
              //   if (events) alert(`clicked: ${JSON.stringify(label)}`);
              // }}
              >
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize} />
                </svg>
                <LegendLabel align="left" margin="0 0 0 4px">
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
    </div>
  );
}

export default MyChart;