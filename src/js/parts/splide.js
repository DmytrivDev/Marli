import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export const instFeedbackSlider = () => {
  const slider = document.querySelector('.feedback-splide');

  if (slider) {
    const options = {
      type: 'slide',
      speed: 1000,
      pagination: false,
      updateOnMove: true,
      perPage: 3,
      perMove: 1,
      gap: '1.88rem',
      breakpoints: {
        960: {
          perPage: 2,
          perMove: 1,
          gap: '1rem',
        },
        760: {
          arrows: false,
          pagination: true,
          perPage: 1,
        },
      },
    };

    new Splide(slider, options).mount();
  }
};
