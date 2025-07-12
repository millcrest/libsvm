import gridSearchBenchmark from './iris/grid-search-benchmark';
import crossValidationBenchmark from './iris/cross-validation-benchmark.js';
import precomputedBenchmark from './iris/precomputed-cv-benchmark.js';
import { loadSVM } from '../wasm.js';

const benchmarks = {
  'iris/grid-search': gridSearchBenchmark,
  'iris/cross-validation': crossValidationBenchmark,
  'iris/precomputed-cv': precomputedBenchmark,
};

onmessage = async function (event) {
  postMessage({
    method: event.data.method,
    result: 'running',
  });
  const SVM = await loadSVM();
  const benchmark = benchmarks[event.data.benchmark];
  if (!benchmark) {
    throw new Error(`Benchmark ${event.data.benchmark} not found`);
  }

  const result = await benchmark(SVM, event.data.time);
  event.data.result = result;
  postMessage(event.data);
};
