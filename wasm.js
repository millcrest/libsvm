import load from './src/loadSVM.js';
import libsvm from './out/wasm/libsvm.js';

export async function loadSVM() {
  const module = await libsvm();
  return load(module);
}
