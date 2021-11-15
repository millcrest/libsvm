import React from 'react';

import SVCCanvas from '../containers/SVCCanvas';
import ChooseLabel from '../containers/ChooseLabel';
import ControlBar from '../containers/SVCControlBar';
import SVCConfig from '../containers/SVCConfig';

export default function SVC() {
  return (
    <div>
      <h2>Support vector classification</h2>
      <div className="row justify-content-end mt-4 mb-4">
        <div className="col-lg-7 col-xl-7 col-md-12">
          <SVCCanvas style={{ imageRendering: 'pixelated', float: 'left' }} />
          <ControlBar
            vertical={true}
            style={{ paddingLeft: 4 }}
            helpTitle="Support vector classification canvas"
            help="Each sample is a 2-dimensional data point [x, y] that is represented by a circle. All samples are used to train the SVM classifier. A circle with a thick border means it is a support vector.The color of each pixel in the background represents the decision of the classifier at the pixel's coordinates."
          />
          <ChooseLabel style={{ clear: 'both', paddingTop: 4 }} />
        </div>
        <div className="clearfix hidden-sm-up" />
        <div className="col-lg-5 col-xl-5 col-md-12 mt-sm-3 col">
          <SVCConfig />
        </div>
      </div>
    </div>
  );
}
