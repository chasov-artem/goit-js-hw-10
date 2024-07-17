import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // let selectedDates = selectedDates[0];
    // validateSelectedDate(selectedDate);
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);
