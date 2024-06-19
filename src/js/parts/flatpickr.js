import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

flatpickr('#choose-date', {
  altInput: true,
  altFormat: 'M j, Y',
  dateFormat: 'd.m.Y',
  showMonths: 1,
  minDate: 'today',
  shorthandCurrentMonth: true,
  maxDate: new Date().fp_incr(21),
  disableMobile: 'true',
  locale: {
    firstDayOfWeek: 0,
    weekdays: {
      shorthand: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      longhand: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
  },
});

const monthDropdown = document.querySelector('.flatpickr-monthDropdown-months');
monthDropdown.disabled = true;

const style = document.createElement('style');
style.innerHTML = `
    .flatpickr-calendar .dayContainer span:nth-child(n+36) {
      display: none !important;
    }
  `;
document.head.appendChild(style);

const chooseDate = document.querySelector('.praci-cl__choose-date');
const radioButtons = document.querySelectorAll('input[name="praci-cl-date"]');

chooseDate?.addEventListener('click', () => {
  chooseDate.classList.add('is-check');

  radioButtons.forEach(function (radio) {
    radio.checked = false;
  });
});

radioButtons?.forEach(radio => {
  radio.addEventListener('click', () => {
    chooseDate.classList.remove('is-check');
  });
});
