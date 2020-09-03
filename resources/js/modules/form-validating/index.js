import $$ from '@utilities/selectors';

// Function to check if  error message exists
function messageExists(el, attr) {
  return el.nextElementSibling && el.nextElementSibling.getAttribute(attr) ? true : false;
}

const validateForm = function validateForm() {
  let input,
      regex,
      invalidInputs,
      errorMessage,
      errorContainer;

  $$.contactForm.addEventListener('keyup', function(e) {

    input = e.target.closest('.form-input-field');
    
    if (!input) return;

    if (messageExists(input, 'data-message')) {

      errorContainer = input.nextElementSibling;
      errorMessage = input.nextElementSibling.getAttribute('data-message');

    }
    
    if (input.hasAttribute('data-regex')) {
      regex = RegExp(input.getAttribute('data-regex'));
    }

    if (input.hasAttribute('data-regex')) {
      if (regex.test(input.value)) {
  
        input.hasAttribute('data-valid') ? input.setAttribute('data-valid', 'true') : null;
        input.classList.contains('form-input-field--invalid') ? input.classList.remove('form-input-field--invalid') : null;

        if (messageExists(input, 'data-message')) {

          errorContainer.textContent === errorMessage ? errorContainer.textContent = null : null;
          errorContainer.setAttribute('aria-hidden', 'false');

        }

      } else if (!input.value && e.which === 9 || e.which === 8 || (e.which >= 37 && e.which <= 40)) {
        
        return;
    
      } else if (input === $$.emailInput) {
        
        return;

      } else {

        input.hasAttribute('data-valid') ? input.setAttribute('data-valid', 'false') : null;
        input.classList.contains('form-input-field--invalid') ? null : input.classList.add('form-input-field--invalid');

        if (messageExists(input, 'data-message')) {

          errorContainer.textContent === errorMessage ? null : errorContainer.textContent = errorMessage;
          errorContainer.setAttribute('aria-hidden', 'true');

        }
      }
    } 

    invalidInputs = this.querySelectorAll('[data-valid="false"]');
    $$.submitBtn.disabled = invalidInputs.length ? true : false;

  })

  $$.contactForm.addEventListener('focusout', function(e) {
   
    input = e.target.closest('.form-input-field');

    if (!input) return;

    if (input.hasAttribute('data-regex')) {
    
      regex = RegExp(input.getAttribute('data-regex'));
    
    }

    if (messageExists(input, 'data-message')) {
      
      errorContainer = e.target.nextElementSibling;
      errorMessage = e.target.nextElementSibling.getAttribute('data-message');
    
    }

    if (!input.value && input.classList.contains('required')) {
     
      input.classList.contains('border-red-100') ? null : input.classList.add('border-red-100');
      $$.requiredPopUp.classList.contains('hidden') ? $$.requiredPopUp.classList.remove('hidden') : null;
   
    } else {

      input.classList.contains('border-red-100') ? input.classList.remove('border-red-100') : null;
    
    }


    if (input === $$.emailInput && input.hasAttribute('data-regex') && !regex.test(e.target.value) && input.value) {

      input.classList.contains('form-input-field--invalid') ? null : input.classList.add('form-input-field--invalid');

      if (messageExists(input, 'data-message')) {

        errorContainer.textContent === errorMessage ? null : errorContainer.textContent = errorMessage;
        errorContainer.setAttribute('aria-hidden', 'false');

      }
    }

    invalidInputs = this.querySelectorAll('[data-valid="false"]');
    $$.submitBtn.disabled = invalidInputs.length ? true : false;
  })
}()

export default validateForm;

