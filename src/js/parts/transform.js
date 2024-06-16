const loadingBox = document.querySelector('.loading-cl__loading-box');
const loadingName = document.querySelector('.loading-cl__loading-name');
const loadingList = document.querySelector('.loading-cl__loading-list');

if (loadingBox) {
  loadingName.addEventListener('click', () => {
    loadingList.classList.toggle('is-opened');
    loadingBox.classList.toggle('is-opened');
  });

  window.addEventListener('click', e => {
    if (!e.target.closest('.loading-cl__loading-name')) {
      loadingBox.classList.remove('is-opened');
      loadingList.classList.remove('is-opened');
    }
  });
}
