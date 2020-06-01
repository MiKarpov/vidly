function init() {}

function error(error) {
  console.error(error);
}

function log(message) {
  console.log(message);
}

function log2(message, object) {
  console.log(message, object);
}

export default {
  init,
  log,
  log2,
  error,
};
