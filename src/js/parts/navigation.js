import scrollToElement from 'scroll-to-element';

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

const ankors = document.querySelectorAll('.ankor > a, a.ankor');
if (ankors) {
  ankors.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const targ = e.target.getAttribute('href');
      const targetH = document.querySelector(targ);
      console.log(targetH)
      if (targ && targetH) {
        const options = {
          offset: 0,
          duration: 700,
        };

        scrollToElement(targetH, options);
      } else {
        const protocol = window.location.protocol;
        const host = document.location.host;
        const fullUrl = window.location.href;
        const languageCodeRegex = /\/([a-z]{2})\//;
        const match = fullUrl.match(languageCodeRegex);
        const languageCode = match ? `/${match[1]}` : '';

        const url = protocol + '//' + host + languageCode + targ;

        window.location.href = url;
      }
    });
  });
}
