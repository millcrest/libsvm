import React from 'react';

import { CANVAS_RESOLUTION, CANVAS_SCALE_FACTOR } from '../constants';
import connectStyle from './connectStyle';

function ChooseLabel(props) {
  const { colors, setActiveLabel, activeLabel, currentBreakpoint } = props;

  const width =
    CANVAS_RESOLUTION[currentBreakpoint] *
    CANVAS_SCALE_FACTOR[currentBreakpoint];

  function renderColorButton(color, idx) {
    return (
      <div
        key={idx}
        style={{ backgroundColor: color, marginBottom: 5 }}
        className={`choose-label-element${
          activeLabel === idx ? ' choose-label-element-active' : ''
        }`}
        onClick={() => setActiveLabel(idx)}
      />
    );
  }

  return (
    <div style={props.style}>
      <div style={{ width }}>
        <div className="choose-label-container">
          {colors.map(renderColorButton)}
        </div>
      </div>
    </div>
  );
}

export default connectStyle(ChooseLabel);
