import $$ from '@utilities/selectors';

const submenu = function submenu() {
//   if (!$$.submenu) return;

  const navlinks = document.getElementById('nav-links');
  navlinks.addEventListener('click', function(e){
      const target = e.target;

      if(e.target.classList.contains('parent')){
        e.preventDefault()
      }

      if(target.nextSibling.classList.contains('submenu')){
        let menu = target.nextSibling;
        menu.classList.toggle('hidden');
        menu.classList.toggle('block');

        menu.addEventListener('mouseleave', function(e){
          menu.classList.add('hidden');
        })
      };
  })

  function getSiblings(elem){
    	// Setup siblings array and get the first sibling
    var siblings = [];
    var sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling
    }

    return siblings;

  };
}()

export default submenu;
