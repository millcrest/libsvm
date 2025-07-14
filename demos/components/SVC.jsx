import React from 'react';

import SVCCanvas from '../containers/SVCCanvas';
import ControlBar from '../components/ControlBar';
import SVCConfig from '../containers/SVCConfig';
import {
  SVC_INIT_LABELS,
  SVC_INIT_POINTS,
  SVC_LABEL_COLORS,
} from '../constants';
import useCanvasPoints from '../hooks/useCanvasPoints';
import ChooseLabel from '../containers/ChooseLabel';

import { useForm, FormProvider } from 'react-hook-form';

export default function SVC() {
  const methods = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      type: '0',
      kernel: '2',
      cost: 1,
      nu: 0.5,
      gamma: 0.01,
      degree: 1,
      epsilon: 0.1,
    },
  });
  const [state, actions] = useCanvasPoints(
    SVC_INIT_POINTS,
    SVC_INIT_LABELS,
    SVC_LABEL_COLORS,
  );
  return (
    <FormProvider {...methods}>
      <h2>Support vector classification</h2>
      <div className="d-flex flex-wrap mt-4 mb-4" style={{ gap: 32 }}>
        <div>
          <SVCCanvas
            style={{ imageRendering: 'pixelated', float: 'left' }}
            state={state}
            actions={actions}
          />
          <ControlBar
            style={{ paddingLeft: 4 }}
            helpTitle="Support vector classification canvas"
            help="Each sample is a 2-dimensional data point [x, y] that is represented by a circle. All samples are used to train the SVM classifier. A circle with a thick border means it is a support vector. The color of each pixel in the background represents the decision of the classifier at the pixel's coordinates."
            clear={actions.clearPoints}
            undo={actions.undoPoints}
            redo={actions.redoPoints}
            canUndo={state.history.before.length > 0}
            canRedo={state.history.after.length > 0}
          />
          <ChooseLabel
            style={{ clear: 'both', paddingTop: 4 }}
            colors={state.colors}
            setActiveLabel={actions.setActiveLabel}
            activeLabel={state.activeLabel}
          />
        </div>
        <div className="col" style={{ minWidth: 400 }}>
          <SVCConfig />
        </div>
      </div>
    </FormProvider>
  );
}
