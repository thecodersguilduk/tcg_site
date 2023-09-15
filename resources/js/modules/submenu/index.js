import $$ from '@utilities/selectors';

const submenu = (function submenu() {
	const navlinks = document.getElementById('nav-links');
	const mobileNav = document.getElementById('mobile-nav');

	navlinks.addEventListener('click', toggleSubMenu);
	mobileNav.addEventListener('click', toggleSubMenu);

	function toggleSubMenu(e) {
		const target = e.target;

		if (target.nodeName.toLowerCase() === 'li') {
			//now open thesubmenu of the li just clicked on
			const currentSubMenu = target.querySelector('.submenu');
			if (currentSubMenu.classList.contains('block')) {
				currentSubMenu.classList.remove('block');
				currentSubMenu.classList.add('hidden');
			} else {
				currentSubMenu.classList.remove('hidden');
				currentSubMenu.classList.add('block');
			}

			//close all the submenus
			const submenus = document.querySelectorAll('.submenu');
			submenus.forEach((menu) => {
				console.log(menu.parentElement);
				if (
					menu.classList.contains('block') &&
					target.innerText.toLowerCase() !==
						menu.parentElement.innerText.toLowerCase()
				) {
					// console.log('were here');
					menu.classList.remove('block');
					menu.classList.add('hidden');
					// console.log(menu.classList);
				}
			});

			currentSubMenu.addEventListener('mouseleave', function (e) {
				currentSubMenu.classList.remove('block');
				currentSubMenu.classList.add('hidden');
			});
		}
	}
})();

export default submenu;
