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
const addressInputs = document.querySelectorAll('.calc-address__choice-input');
const addressLists = document.querySelectorAll('.calc-address__choice-list');

if (addressChoices) {
  addressInputs.forEach((input, index) => {
    input.addEventListener('click', () => {
      addressLists[index].classList.toggle('is-opened');
      input.classList.toggle('is-opened');
    });
  });

  window.addEventListener('click', e => {
    if (!e.target.closest('.calc-address__choice-input')) {
      addressLists.forEach(list => list.classList.remove('is-opened'));
      addressInputs.forEach(input => input.classList.remove('is-opened'));
    }
  });
}
