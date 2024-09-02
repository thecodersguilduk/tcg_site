const sliderSettings = function(){
  const reviewsSlick = document.querySelector('.testimonials__slider');
  const courseSlick = document.querySelector('.course__testimonials__slider');

  if(!reviewsSlick && !courseSlick) return

  if(reviewsSlick){
    return $('.testimonials__slider').slick({
      dots: true,
      prevArrow: $('.testimonials .prev'),
      nextArrow: $('.testimonials .next'),
      appendDots: $('.testimonials .dots'),
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }

  if(courseSlick){
    return $('.course__testimonials__slider').slick({
      dots: true,
      prevArrow: null,
      nextArrow: null,
      appendDots: $('.dots'),
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }

  
}()

export default sliderSettings