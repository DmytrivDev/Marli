import NiceSelect2 from 'nice-select2';

new NiceSelect2(document.getElementById('a-select'), {
  searchable: false,
  placeholder: 'AT',
});

const loadingBox = document.querySelector('.choice-address');
const loadingName = document.querySelector('.choice-address__input');
const loadingList = document.querySelector('.choice-address__list');

if (loadingBox) {
  loadingName?.addEventListener('click', () => {
    loadingList?.classList.toggle('is-opened');
    loadingName.classList.toggle('is-opened');
  });

  window.addEventListener('click', e => {
    if (!e.target.closest('.choice-address__input')) {
      loadingList?.classList.remove('is-opened');
      loadingName?.classList.remove('is-opened');
    }
  });
}
