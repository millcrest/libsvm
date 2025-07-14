import React from 'react';

import { getSVCCanvasData } from '../selectors/index';
import Canvas from '../components/Canvas';
import { useWatch } from 'react-hook-form';
import { connect } from 'react-redux';
import connectStyle from './connectStyle';

function SVCCanvas(props) {
  const { state, actions, currentBreakpoint, ...otherProps } = props;
  const config = useWatch();
  const canvasProps = getSVCCanvasData(state, config, currentBreakpoint);
  return (
    <Canvas
      {...otherProps}
      {...canvasProps}
      addPoint={actions.addPoint}
      labelColors={state.colors}
    />
  );
}

export default connectStyle(SVCCanvas);
