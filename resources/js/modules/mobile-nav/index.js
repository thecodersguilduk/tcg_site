import $$ from '@utilities/selectors'

const mobileNav = function mobileNav()
{

  $$.navToggle.addEventListener('click', function(e) {

    this.classList.toggle('burger-active');

    $$.mobileNavContainer.classList.toggle('opacity-0');

  })

}()

export default mobileNav
