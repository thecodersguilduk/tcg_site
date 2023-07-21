import $$ from "@utilities/selectors";

const expressionInterest = (function expressionInterest() {
  if (!$$.expressionInterestForm) return;

  const content = document.getElementById("content");
  let hasBeenOpened = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasBeenOpened) {
        $$.expressionInterestForm.classList.add("modal--active");
        hasBeenOpened = true;
      }
    });
  });

  observer.observe(content);
})();

export default expressionInterest;
