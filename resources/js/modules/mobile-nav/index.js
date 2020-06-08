import $$ from '@utilities/selectors'

const MobileNav = function MobileNav()
{

    $$.navToggle.addEventListener('click', function() {

        this.classList.toggle('menu-toggle-active')
        $$.navLinks.classList.toggle('hidden')

        // set aria-expanded attribute on menu toggle button
        if ( this.getAttribute('aria-expanded') === 'false' )
        {

            this.setAttribute('aria-expanded', 'true')

        } else {

            this.setAttribute('aria-expanded', 'false')

        }

    })

}()

export default MobileNav
