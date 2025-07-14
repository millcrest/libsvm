import Kernel from 'ml-kernel';
import range from 'lodash.range';
import data from 'ml-dataset-iris';
import { loadSVM } from '../wasm.js';

const SVM = await loadSVM();

const gamma = 0.2;
const cost = 1;

async function exec(precomputed) {
  var trainData;

  const features = data.getNumbers();
  let labels = data.getClasses();
  const classes = data.getDistinctClasses();
  const c = {};
  classes.forEach((v, idx) => (c[v] = idx));
  labels = labels.map((l) => c[l]);

  if (precomputed) {
    const kernel = new Kernel('gaussian', { sigma: 1 / Math.sqrt(gamma) });
    trainData = kernel
      .compute(features)
      .addColumn(0, range(1, labels.length + 1));
  } else {
    trainData = features;
  }

  const svm = new SVM({
    quiet: true,
    cost: cost,
    kernel: precomputed ? SVM.KERNEL_TYPES.PRECOMPUTED : SVM.KERNEL_TYPES.RBF,
    gamma,
    probabilityEstimates: true,
  });
  svm.train(trainData, labels);
  var pred = svm.predictProbability(trainData);
  console.log(JSON.stringify(pred, null, 2));
}

await exec(true);
