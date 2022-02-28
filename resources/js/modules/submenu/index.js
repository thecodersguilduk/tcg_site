import $$ from '@utilities/selectors';

const submenu = function submenu() {
//   if (!$$.submenu) return;

  const navlinks = document.getElementById('nav-links');
  navlinks.addEventListener('click', function(e){
      e.preventDefault();
      const target = e.target;
      console.log(target.nextSibling);
  })
}()

export default submenu;
