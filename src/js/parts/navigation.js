const burger = document.querySelector('.header__burger');
const mobMenu = document.querySelector('.mob-menu');
const body = document.querySelector('body');
const tel = document.querySelector('.address-tel');

if (burger) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-opened');
    mobMenu.classList.toggle('is-opened');
    tel.classList.toggle('is-hidden');
    body.classList.toggle('overhide');
  });
}

const langBoxes = document.querySelectorAll('.header__lang');

if (langBoxes) {
  langBoxes.forEach(langBox => {
    langBox.addEventListener('click', () => {
      const subMenu = langBox.querySelector('.sub-menu');

      if (subMenu) {
        subMenu.classList.toggle('is-opened');
      }
    });
  });
}

window.addEventListener('click', () => {
  document.querySelectorAll('.sub-menu.is-opened').forEach(openedMenu => {
    openedMenu?.classList.remove('is-opened');
  });
});
