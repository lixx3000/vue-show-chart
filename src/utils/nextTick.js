let timeFunc = null;

const callbacks = [];

let status = 'open';

function handlerCallbacks () {
  while (callbacks.length) (callbacks.shift())();
  status = 'open';
}

timeFunc = () => Promise.resolve().then(handlerCallbacks);

function nextTick (cb) {
  if (status === 'open') {
    timeFunc();
    status = 'pending';
  }
  const index = callbacks.indexOf(cb);
  if (~index) {
    callbacks.splice(index, 1);
  }
  callbacks.push(cb);
}

export default nextTick;
