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
      // width: '48.5625rem',
      gap: '1.88rem',
      breakpoints: {
        960: {
          perPage: 2,
          arrows: false,
          pagination: true,
          gap: '1rem',
        },
        780: {
          perPage: 1,
        },
      },
    };

    new Splide(slider, options).mount();

    // splide.on('moved', () => {
    //   updateSlideNumber(splide);
    // });
  }

  // arrowsClicker();
};
