import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    validateDate = validateSelectedDate(selectedDate);
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);
