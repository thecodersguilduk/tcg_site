
const courseGridSlider = function (){
  const courseGridSlider = document.querySelector('#course-grid');
  console.log(courseGridSlider);
    if(!courseGridSlider) return;
    

    return $(courseGridSlider).slick({
          dots: true,
          prevArrow: $('.prev'),
          nextArrow: $('.next'),
          appendDots: $('.dots'),
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1
        });

}()

export default courseGridSlider;