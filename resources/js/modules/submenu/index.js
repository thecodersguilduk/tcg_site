import $$ from '@utilities/selectors';

const submenu = function submenu() {
//   if (!$$.submenu) return;

  const navlinks = document.getElementById('nav-links')
  const mobileNav = document.getElementById('mobile-nav')

  navlinks.addEventListener('click', toggleSubMenu)
  mobileNav.addEventListener('click', toggleSubMenu)

  function toggleSubMenu(e){
        const target = e.target;


        if(e.target.classList.contains('parent')){
          e.preventDefault()

          let menu = target.querySelector('.submenu');
          menu.classList.toggle('hidden');
          menu.classList.toggle('block');

          menu.addEventListener('mouseleave', function(e){
            menu.classList.add('hidden');
          })

      }
    }
}()

export default submenu;
