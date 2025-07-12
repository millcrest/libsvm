import { gamma, cost } from './util.js';

export default async function exec(SVM, time) {
  const data = await import('ml-dataset-iris');
  const MILISECONDS = time * 1000;

  const features = data.getNumbers();
  let labels = data.getClasses();
  const classes = data.getDistinctClasses();

  const c = {};
  classes.forEach((v, idx) => (c[v] = idx));
  labels = labels.map((l) => c[l]);

  const startTime = performance.now();
  let endTime = performance.now();
  let count = 0;
  while (endTime - startTime < MILISECONDS) {
    for (let c of cost) {
      for (let g of gamma) {
        const svm = new SVM({
          quiet: true,
          cost: c,
          gamma: g,
        });
        svm.train(features, labels);
        svm.free();
      }
    }
    count++;
    endTime = performance.now();
  }

  return count;
}
