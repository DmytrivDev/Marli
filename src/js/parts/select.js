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

const loadingBox = document.querySelector('.cals-address__choice');
const loadingName = document.querySelector('.cals-address__choice-input');
const loadingList = document.querySelector('.cals-address__choice-list');

if (loadingBox) {
  loadingName?.addEventListener('click', () => {
    loadingList?.classList.toggle('is-opened');
    loadingName.classList.toggle('is-opened');
  });

  window.addEventListener('click', e => {
    if (!e.target.closest('.cals-address__choice-input')) {
      loadingList?.classList.remove('is-opened');
      loadingName?.classList.remove('is-opened');
    }
  });
}
