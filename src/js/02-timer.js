import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let eventTimeStart = null;

const ref = {
  btnStart: document.querySelector('button[data-start]'),
  daysCounter: document.querySelector('span[data-days]'),
  hoursCounter: document.querySelector('span[data-hours]'),
  minutesCounter: document.querySelector('span[data-minutes]'),
  secondsCounter: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      return alert('Please choose a date in the future');
    }
    ref.btnStart.removeAttribute('disabled');

    eventTimeStart = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

ref.btnStart.setAttribute('disabled', '');
ref.btnStart.addEventListener('click', onStartClickInit);

function onStartClickInit() {
  setInterval(eventTimeCounter, 1000);
}

function eventTimeCounter() {
  const convertedData = convertMs(eventTimeStart - Date.now());
  eventTimer(convertedData);
}

function eventTimer(time = {}) {
  ref.daysCounter.textContent = `${time.days}`.padStart(2, 0);
  ref.hoursCounter.textContent = `${time.hours}`.padStart(2, 0);
  ref.minutesCounter.textContent = `${time.minutes}`.padStart(2, 0);
  ref.secondsCounter.textContent = `${time.seconds}`.padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
