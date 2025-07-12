import load from './src/loadSVM.js';
import libsvm from './build/libsvm.js';

export async function loadSVM() {
  const module = await libsvm();
  return load(module);
}
