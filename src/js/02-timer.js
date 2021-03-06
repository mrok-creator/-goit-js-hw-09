import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const ref = {
  btnStart: document.querySelector('button[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  daysCounter: document.querySelector('span[data-days]'),
  hoursCounter: document.querySelector('span[data-hours]'),
  minutesCounter: document.querySelector('span[data-minutes]'),
  secondsCounter: document.querySelector('span[data-seconds]'),
};
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      ref.btnStart.setAttribute('disabled', '');
      return Notify.failure('Please choose a date in the future');
      //   return alert('Please choose a date in the future');
    }
    ref.btnStart.removeAttribute('disabled');
    Notify.success(`You choose a valid date))`);
  },
};

flatpickr('#datetime-picker', options);

ref.btnStart.setAttribute('disabled', '');
ref.btnStart.addEventListener('click', onStartClickInit);

function onStartClickInit() {
  timerId = setInterval(eventTimeCounter, 1000);
  ref.btnStart.setAttribute('disabled', '');
}

function eventTimeCounter() {
  const date = new Date(ref.inputDate.value);
  const convertedData = convertMs(date - Date.now());
  if (date < Date.now()) {
    clearInterval(timerId);
    ref.btnStart.removeAttribute('disabled');
    Notify.success(`Your Event Start Right Now!!`);
    return eventTimer();
  }
  eventTimer(convertedData);
}

function eventTimer(time = { days: 0, hours: 0, minutes: 0, seconds: 0 }) {
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
