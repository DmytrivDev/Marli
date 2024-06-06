export const openBurger = () => {
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
};
