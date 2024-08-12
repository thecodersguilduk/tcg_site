const sliderSettings = function(){
  const reviewsSlick = document.querySelector('.testimonials__slider');
  const courseSlick = document.querySelector('.course__testimonials__slider');

  if(!reviewsSlick && !courseSlick) return

  if(reviewsSlick){
    $('.testimonials__slider').slick({
      dots: true,
      prevArrow: $('.testimonials__slider .prev'),
      nextArrow: $('.testimonials__slider .next'),
      appendDots: $('.testimonials__slider .slick-dots'),
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }

  // if(courseSlick){
  //   $('.course__testimonials__slider').slick({
  //     dots: true,
  //     prevArrow: null,
  //     nextArrow: null,
  //     appendDots: $('.course__testimonials__slider .dots'),
  //     infinite: true,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   });
  // }

  
}()

export default sliderSettings

