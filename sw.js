const filesCacheMap = new Map();

filesCacheMap.set('/utils.js', `export function adi() { console.log('yolo'); }`);

self.addEventListener('message', (event) => {
  if (!event.data) {
    return;
  }

  const { type, payload } = event.data;
  if (type === 'UPDATE_FILE') {
    const { name, code } = payload;
    filesCacheMap.set(name, code);
  }
});

function fileResponseHandler(fileName) {
  const code = filesCacheMap.get(fileName);
  const body = new Blob([code], {
    type: 'application/javascript',
  });
  return new Response(body);
}

self.addEventListener('fetch', function (event) {
  const { request } = event;

  if (request.mode === 'navigate') {
    return;
  }

  const url = new URL(request.url);
  const fileName = url.pathname;

  if (filesCacheMap.has(fileName)) {
    event.respondWith(fileResponseHandler(fileName));
  }
});
