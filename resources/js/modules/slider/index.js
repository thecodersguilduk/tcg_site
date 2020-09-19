import $$ from '@utilities/selectors';

$('.testimonials__slider').slick({
  dots: true,
  prevArrow: $('.prev'),
  nextArrow: $('.next'),
  appendDots: $('.dots'),
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
});