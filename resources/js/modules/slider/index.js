import $$ from '@utilities/selectors';

const sliderSettings = function(){
  const slick = document.querySelector('.testimonials__slider');

  if(!slick) return

  return $('.testimonials__slider').slick({
    dots: true,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    appendDots: $('.dots'),
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
}()

export default sliderSettings

