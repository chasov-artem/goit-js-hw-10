import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate = null;
let countdownInterval = null;

const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    validateSelectedDate(selectedDate);
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

// Функція валідації обраної дати
function validateSelectedDate(selectedDate) {
  if (selectedDate <= new Date()) {
    window.alert('Please choose a date in the future');
    startBtn.disabled = true;
  } else {
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  }
}

// Обробник події для кнопки "Start"
startBtn.addEventListener('click', () => {
  if (userSelectedDate) {
    startCountdown(userSelectedDate);
    startBtn.disabled = true;
    datetimePicker.disabled = true;
  }
});

// Функція зворотного відліку
function startCountdown(targetDate) {
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      datetimePicker.disabled = false;
      startBtn.disabled = true;
      window.alert('Time is up!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

// Функція оновлення інтерфейсу таймера
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysSpan.textContent = String(days).padStart(2, '0');
  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');
}

// Функція підрахунку значень
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));
