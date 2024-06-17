import NiceSelect2 from 'nice-select2';
// import 'nice-select2/dist/css/nice-select2.css';

document.addEventListener('DOMContentLoaded', () => {
  NiceSelect2.bind(document.getElementById('a-select'), {});
});

const loadingBox = document.querySelector('.loading-cl__loading-box');
const loadingName = document.querySelector('.loading-cl__loading-address');
const loadingList = document.querySelector('.loading-cl__loading-list');

if (loadingBox) {
  loadingName?.addEventListener('click', () => {
    loadingList?.classList.toggle('is-opened');
    loadingName.classList.toggle('is-opened');
  });

  window.addEventListener('click', e => {
    if (!e.target.closest('.loading-cl__loading-address')) {
      loadingList?.classList.remove('is-opened');
      loadingName?.classList.remove('is-opened');
    }
  });
}
