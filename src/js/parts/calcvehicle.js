const handleSelection = selectedRadio => {
  const labels = document.querySelectorAll('.vehicle__content-label');

  labels.forEach(labl => {
    labl.classList.remove('is-check');

    const backview = labl.querySelector('.vehicle__backview');
    if (backview) {
      backview.classList.remove('is-check');
    }

    const previewImg = labl.querySelector('.vehicle__preview-img');
    if (previewImg) {
      previewImg.classList.remove('is-hidden');
    }

    const sidebar = labl
      .closest('.vehicle__item')
      .querySelector('.vehicle__sidebar');
    if (sidebar) {
      sidebar.classList.remove('is-check');
    }
  });

  const selectedLabel = selectedRadio.closest('.vehicle__content-label');

  if (selectedLabel) {
    selectedLabel.classList.add('is-check');

    const backview = selectedLabel.querySelector('.vehicle__backview');
    if (backview) {
      backview.classList.add('is-check');
    }

    const previewImg = selectedLabel.querySelector('.vehicle__preview-img');
    if (previewImg) {
      previewImg.classList.add('is-hidden');
    }

    const sidebar = selectedLabel
      .closest('.vehicle__item')
      .querySelector('.vehicle__sidebar');
    if (sidebar) {
      sidebar.classList.add('is-check');
    }
  }
};

const radioButtons = document.querySelectorAll('input[name="vehicle-truck"]');

radioButtons.forEach(radio => {
  if (radio.checked) {
    handleSelection(radio);
  }

  radio.addEventListener('change', () => {
    if (radio.checked) {
      handleSelection(radio);
    }
  });
});
