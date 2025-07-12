import { loadSVM } from '../wasm.js';
const SVM = await loadSVM();

let svm = new SVM({
  kernel: SVM.KERNEL_TYPES.RBF,
  type: SVM.SVM_TYPES.ONE_CLASS,
  gamma: 1,
  cost: 1,
  nu: 0.1,
});
const features = [
  [0, 0],
  [1, 1],
  [1, 0],
  [0, 1],
];
const toPredict = [
  [0.5, 0.5],
  [1.5, 1],
];
const expected = [1, -1];
const labels = [0, 0, 0, 0];
svm.train(features, labels);
for (let i = 0; i < toPredict.length; i++) {
  const pred = svm.predictOne(toPredict[i]);
  console.log(`pred: ${pred}, expected: ${expected[i]}`);
}
