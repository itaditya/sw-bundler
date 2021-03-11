import swUrl from './sw.js?url';

const files = {
  '/utils.js': {
    code: `export function adi() { console.log('yolo'); }`,
  },
  '/react/hooks.js': {
    code: `export function useBrain() { console.log('galaxy brain'); }`,
  },
};

async function run() {
  try {
    await navigator.serviceWorker.register(swUrl);

    const updateFilePath = '/react/hooks.js';
    navigator.serviceWorker.controller.postMessage({
      type: 'UPDATE_FILE',
      payload: {
        name: updateFilePath,
        code: files[updateFilePath].code,
      }
    });
  } catch (error) {
    console.log(`my error`, error); // aditodo remove this
  }
}

if ('serviceWorker' in navigator) {
  run();
}
