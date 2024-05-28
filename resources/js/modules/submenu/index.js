const submenu = (function submenu() {
	document.addEventListener('DOMContentLoaded', function() {
		// Toggle mobile nav
		const navToggle = document.getElementById('nav-toggle');
		const mobileNavContainer = document.getElementById('mobile-nav-container');
		navToggle.addEventListener('click', function() {
		  const expanded = this.getAttribute('aria-expanded') === 'true' || false;
		  this.setAttribute('aria-expanded', !expanded);
		  mobileNavContainer.classList.toggle('hidden');
		});
	  
		// Handle submenu toggle
		const submenuButtons = document.querySelectorAll('.dropdown-trigger');
		submenuButtons.forEach(button => {
		  button.addEventListener('click', function(event) {
			event.preventDefault();
			const submenu = this.nextElementSibling;
			const expanded = this.getAttribute('aria-expanded') === 'true' || false;
			this.setAttribute('aria-expanded', !expanded);
			submenu.classList.toggle('hidden');
		  });
		});
	  });
	  
}());

export default submenu;
