import Kernel from 'ml-kernel';
import range from 'lodash.range';

const gamma = 0.2;
const cost = 1;

export default async function exec(SVM, time) {
  const data = await import('ml-dataset-iris');
  const MILISECONDS = time * 1000;

  const features = data.getNumbers();
  let labels = data.getClasses();
  const classes = data.getDistinctClasses();
  const c = {};
  classes.forEach((v, idx) => (c[v] = idx));
  labels = labels.map((l) => c[l]);

  // We precompute the gaussian kernel
  const kernel = new Kernel('gaussian', { sigma: 1 / Math.sqrt(gamma) });
  const KData = kernel
    .compute(features)
    .addColumn(0, range(1, labels.length + 1));

  const t1 = performance.now();
  let t2 = performance.now();
  let count = 0;
  while (t2 - t1 < MILISECONDS) {
    const svm = new SVM({
      quiet: true,
      cost: cost,
      kernel: SVM.KERNEL_TYPES.PRECOMPUTED,
    });
    svm.crossValidation(KData, labels, labels.length);
    svm.free();
    count++;
    t2 = performance.now();
  }

  // console.log('accuracy: ', result.reduce((prev, current, idx) => current === labels[idx] ? prev + 1 : prev, 0)/ labels.length);
  return count;
}
