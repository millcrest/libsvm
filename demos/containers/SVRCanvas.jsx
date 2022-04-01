import React from 'react';
import { getSVRCanvasData } from '../selectors/index';
import Canvas from '../components/Canvas';
import { useWatch } from 'react-hook-form';

export default function SVRCanvas(props) {
  const { state, actions, ...otherProps } = props;
  const config = useWatch();

  console.log(actions);
  const canvasProps = getSVRCanvasData(state, config);
  console.log(canvasProps);
  return (
    <Canvas
      {...otherProps}
      {...canvasProps}
      addPoint={actions.addPoint}
      labelColors={state.colors}
    />
  );
}
