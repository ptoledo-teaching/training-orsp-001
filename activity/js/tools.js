
async function delay(miliseconds = 0) {
  await new Promise(async (resolve) => {
    return setTimeout(async () => {
      resolve();
    }, miliseconds);
  });
}

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

function saveParameters() {
  for (let field of fields) {
    localStorage.setItem(field, document.getElementById(field).value);
  }
}

function shuffleArray(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
