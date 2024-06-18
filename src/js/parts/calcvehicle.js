const boxLabels = document.querySelectorAll('.vehicle__content-label');

boxLabels.forEach(label => {
  label.addEventListener('click', () => {
    boxLabels.forEach(lab => {
      lab.classList.remove('is-check');

      const backview = lab.querySelector('.vehicle__backview');
      if (backview) {
        backview.classList.remove('is-check');
      }

      const previewImg = lab.querySelector('.vehicle__preview-img');
      if (previewImg) {
        previewImg.classList.remove('is-hidden');
      }

      const sidebar = lab
        .closest('.vehicle__item')
        .querySelector('.vehicle__sidebar');
      if (sidebar) {
        sidebar.classList.remove('is-check');
      }
    });

    label.classList.add('is-check');

    const backview = label.querySelector('.vehicle__backview');
    if (backview) {
      backview.classList.add('is-check');
    }

    const previewImg = label.querySelector('.vehicle__preview-img');
    if (previewImg) {
      previewImg.classList.add('is-hidden');
    }

    const sidebar = label
      .closest('.vehicle__item')
      .querySelector('.vehicle__sidebar');
    if (sidebar) {
      sidebar.classList.add('is-check');
    }
  });
});
