const courseGridSlider = function (){
  const courseGridSlider = document.querySelector('#course-grid');
  
    if(!courseGridSlider) return;

  const parent = document.getElementById('course-grid-container');
    
  const slidesToShow = parent.getAttribute('data-cards') || 2;
  console.log(slidesToShow);
    return $(courseGridSlider).slick({
          dots: true,
          prevArrow: $('.prev'),
          nextArrow: $('.next'),
          appendDots: $('.dots'),
          infinite: true,
          slidesToShow: slidesToShow,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 568,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
        });

}()

export default courseGridSlider;