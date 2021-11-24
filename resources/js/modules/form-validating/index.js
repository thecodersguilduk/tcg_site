import $$ from '@utilities/selectors';

function messageExists(el, attr) {
  return el.nextElementSibling && el.nextElementSibling.getAttribute(attr) ? true : false;
}

const validateForm = function validateForm() {
  if ($$.contactForm) {
  
    let input,
        regex,
        invalidInputs,
        errorMessage,
        errorContainer;

    // Attach keyup event to a contact form
    $$.contactForm.addEventListener('keyup', function(e) {
      // Get the input element
      input = e.target.closest('.form-input-field');

      // If event occured somewhere else than on input field - return;
      if (!input) return;

      // Check if input element has a sibling element with data-message attribute attached
      if (messageExists(input, 'data-message')) {
        errorContainer = input.nextElementSibling;
        errorMessage = input.nextElementSibling.getAttribute('data-message');
      }

      // In input field has data-regex attribute
      if (input.hasAttribute('data-regex')) {

        // Assign the value to regex variable
        regex = RegExp(input.getAttribute('data-regex'));

        // Compare user input with provided regex
        if (regex.test(input.value)) {

          // If user input matches regex - check if it has data-valid attr, and change the attribute value, so the input becomes 'valid'
          input.hasAttribute('data-valid') ? input.setAttribute('data-valid', 'true') : null;

          // Check if input contains specified class, if so - remove it
          input.classList.contains('form-input-field--invalid') ? input.classList.remove('form-input-field--invalid') : null;
          
          // Check if current input element has errorContainer and errorMessage attached 
          if (errorContainer && errorContainer) {

            // Change text content to be empty and hide the element itself
            errorContainer.textContent === errorMessage ? errorContainer.textContent = null : null;
            errorContainer.setAttribute('aria-hidden', 'false');
          }
        
        // Check if event key is navigation key, if so - do nothing
        } else if (!input.value && e.which === 9 || e.which === 8 || (e.which >= 37 && e.which <= 40)) {
          return;

        // Check if current input is email field, if so - break of the function
        } else if (input === $$.emailInput) {
          return;
        
        // If none of the specified above conditions are met:
        } else {

          // If input has data-valid attr - make it hold invlaid state
          input.hasAttribute('data-valid') ? input.setAttribute('data-valid', 'false') : null;

          // If input doesn't contain invalid input class - attach it to the existing class list, if not - do nothing
          input.classList.contains('form-input-field--invalid') ? null : input.classList.add('form-input-field--invalid');

          // Check if current input element has errorContainer and errorMessage attached 
          if (errorContainer && errorContainer) {

            // If so - display error message and make element visible
            errorContainer.textContent === errorMessage ? null : errorContainer.textContent = errorMessage;
            errorContainer.setAttribute('aria-hidden', 'true');
          }
        }
      } 

      // Keeps track of 'invalid' input fields
      invalidInputs = this.querySelectorAll('[data-valid="false"]');
      // If there are no invalid input fields - make button available, else - disable it
      $$.submitBtn.disabled = invalidInputs.length ? true : false;

    })

    // Attach focusout event to a contact form (can't use 'blur' event, because it doesn't bubble)
    $$.contactForm.addEventListener('focusout', function(e) {
      input = e.target.closest('.form-input-field');
      if (!input) return;

      if (messageExists(input, 'data-message')) {
        
        errorContainer = e.target.nextElementSibling;
        errorMessage = e.target.nextElementSibling.getAttribute('data-message');
      
      }

      // Check if input, where event occured - has no value and contains a required class
      if (!input.value && input.classList.contains('required')) {

        // If it does - append red border
        input.classList.contains('border-red-100') ? null : input.classList.add('border-red-100');

        // Show 'Required' pop-up on the top of the form
        $$.requiredPopUp.classList.contains('hidden') ? $$.requiredPopUp.classList.remove('hidden') : null;
      } else {

        // Else - remove red border
        input.classList.contains('border-red-100') ? input.classList.remove('border-red-100') : null;
      }

      // Check if current input is the email field, not empty and has a data-regex attribute
      if (input === $$.emailInput && input.hasAttribute('data-regex') && input.value) {

        // Assign and convert data-regex value into a regular expression
        regex = RegExp(input.getAttribute('data-regex'));

        // Compare input value with provided regex
        if (!regex.test(e.target.value)) {

          input.classList.contains('form-input-field--invalid') ? null : input.classList.add('form-input-field--invalid');
    
          if (errorContainer && errorContainer) {
    
            errorContainer.textContent === errorMessage ? null : errorContainer.textContent = errorMessage;
            errorContainer.setAttribute('aria-hidden', 'false');
    
          }
        }
      }

      invalidInputs = this.querySelectorAll('[data-valid="false"]');
      $$.submitBtn.disabled = invalidInputs.length ? true : false;
    })
  } else {
    return;
  }
}()

export default validateForm;

