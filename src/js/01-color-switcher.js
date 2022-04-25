const ref = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
let switcherId = null;

ref.btnStart.addEventListener('click', onStartBtnClick);
ref.btnStop.addEventListener('click', onStopBtnClick);

function onStartBtnClick(event) {
  event.target.setAttribute('disabled', '');
  ref.btnStop.removeAttribute('disabled');
  switcherId = setInterval(() => {
    ref.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick(event) {
  ref.btnStart.removeAttribute('disabled');
  event.target.setAttribute('disabled', '');
  clearInterval(switcherId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
