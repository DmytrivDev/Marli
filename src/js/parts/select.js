import NiceSelect2 from 'nice-select2';

const selectLoading = document.getElementById('select-loading');
const selectUnloading = document.getElementById('select-unloading');

if (selectLoading) {
  new NiceSelect2(selectLoading, {
    searchable: false,
    placeholder: 'AT',
  });
}

if (selectUnloading) {
  new NiceSelect2(selectUnloading, {
    searchable: false,
    placeholder: 'AT',
  });
}

const addressChoices = document.querySelectorAll('.calc-address__choice');
const addressInputs = document.querySelectorAll(
  '.calc-address__choice-input input'
);
const addressLists = document.querySelectorAll('.calc-address__choice-list');

if (addressChoices) {
  addressInputs.forEach((input, index) => {
    input.addEventListener('focus', () => {
      addressLists[index].classList.add('is-opened');
      input.classList.add('is-opened');
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        addressLists[index].classList.remove('is-opened');
        input.classList.remove('is-opened');
      }, 100);
    });
  });
}
