import $$ from "@utilities/selectors";

const expressionInterest = (function expressionInterest() {
  if (!$$.expressionInterestForm) return;

  // const timer = 12000
  // const x = setTimeout(function(){
  //     $$.expressionInterestForm.classList.add('modal--active');
  // }, timer)
  const content = document.getElementById("content");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $$.expressionInterestForm.classList.add("modal--active");
      }
    });
  });

  observer.observe(content);
})();

export default expressionInterest;
