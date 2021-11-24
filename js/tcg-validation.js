jQuery(document).on("click", ".validateFormStepPrev", function(event) {
    event.preventDefault();
    var fieldsetCounter = jQuery(this).data('fieldsetcounter');
    var fieldsets = jQuery('.application-form--fieldset.active');
    var fieldset = fieldsets[0];
    jQuery(fieldset).removeClass('active');
    var allFieldsets = jQuery('.application-form--fieldset');
    nextFieldSet = fieldsetCounter - 1;
    // console.log(allFieldsets);
    jQuery(allFieldsets[nextFieldSet]).addClass('active');
    scrollTo = jQuery(allFieldsets[nextFieldSet]).offset().top - 100;
    // console.log(allFieldsets[nextFieldSet]);
    // jQuery(allFieldsets[nextFieldSet]).focus();
    jQuery('html, body').animate({
            scrollTop: scrollTo
    }, 2000);
});
jQuery(document).on("click", ".validateFormStepNext, .submitApplication", function(event) {
    event.preventDefault();
    var fieldsetCounter = jQuery(this).data('fieldsetcounter');
    var fieldsets = jQuery('.application-form--fieldset.active');
    var fieldset = fieldsets[0];
    // console.log(fieldset);
    var fieldsetName = jQuery(fieldset).data('fieldset');
    // console.log(fieldsetName);
    for(counter=0; counter < objInputs.length; counter++){
        // console.log(objInputs[counter]);
        if(objInputs[counter].name == fieldsetName){
            var validationInputData = objInputs[counter];
        }
    }
    var validationInputs = validationInputData['fields'];
    // console.log(objInputs);
    // console.log(validationInputs);
    var objValues = {};
    var currentStepValidation = true;
    var scrollToElement;
    jQuery.each( validationInputs, function( key, value ) {
        var required = value.required;
        // console.log(required);
        var selector;
        var border = '#d2d6dc';
        switch(value.type){
            case 'radio':
                var checked = false;
                selector = 'input[name="'+key+'"]';
                // console.log(selector);
                objValues[key] = '';
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                jQuery(selector).each(function( index ) {
                    if(jQuery(this).prop('checked')){
                        checked = true;
                        objValues[key] = jQuery(this).val();
                        // console.log(jQuery(this).val());
                    }
                });
                if(required){
                    jQuery(selector).each(function( index ) {
                        if(!checked){
                            border = 'red';
                            currentStepValidation = false;
                            jQuery(errorMessageClass).removeClass('hidden');
                            if(!scrollToElement){
                                scrollToElement = jQuery(this);
                            }
                        }
                        jQuery(this).css('border-color',border);
                    });
                    if(value.other == objValues[key]){
                        var otherSelector = '#'+key+'_option_selected'
                        var otherInput = jQuery(otherSelector);
                        if(otherInput.val()){
                            jQuery(otherInput).css('border-color',border);
                        } else {
                            jQuery(errorMessageClass).removeClass('hidden');
                            jQuery(otherInput).css('border-color','red');
                            currentStepValidation = false;
                        }
                    }
                }
            break;
            case 'checkbox':
                var checked = false;
                selector = 'input[name="'+key+'"]';
                // console.log(selector);
                objValues[key] = [];
                // console.log(objValues);
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                jQuery(selector).each(function( index ) {
                    if(jQuery(this).prop('checked')){
                        checked = true;
                        // console.log(jQuery(this).val());
                        objValues[key].push(jQuery(this).val());
                    }
                });
                if(required){
                    jQuery(selector).each(function( index ) {
                        if(!checked){
                            border = 'red';
                            currentStepValidation = false;
                            jQuery(errorMessageClass).removeClass('hidden');
                            if(!scrollToElement){
                                scrollToElement = jQuery(this);
                            }
                        }
                        jQuery(this).css('border-color',border);
                    });
                    for(counter=0; counter < objValues[key].length; counter++){
                        var currentCheckedBox = objValues[key][counter];
                        if(value.other == currentCheckedBox){
                            var otherSelector = '#'+key+'_option_selected'
                            var otherInput = jQuery(otherSelector);
                            if(otherInput.val()){
                                jQuery(otherInput).css('border-color',border);
                            } else {
                                jQuery(errorMessageClass).removeClass('hidden');
                                jQuery(otherInput).css('border-color','red');
                                currentStepValidation = false;
                            }
                        }
                    }
                }
            break;
            case 'text':
            case 'date_picker':
                selector = 'input#'+key;
                inputValue = jQuery(selector).val();
                // console.log(errorMessageClass);
                objValues[key] = inputValue;
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                if(!inputValue){
                    if(required){
                        border = 'red';
                        currentStepValidation = false;
                        jQuery(errorMessageClass).removeClass('hidden');
                        if(!scrollToElement){
                            scrollToElement = jQuery(selector);
                        }
                    }
                } else {
                    blnValidation = true;
                    switch(key){
                        case 'postcode':
                            blnValidation = isValidPostcode(inputValue);
                        break;
                        case 'national_insurance':
                            blnValidation = isValidateNationalInsurance(inputValue);
                        break;
                        case 'email':
                            blnValidation = isValidateEmail(inputValue);
                        break;
                    }
                    if(!blnValidation){
                        border = 'red';
                        currentStepValidation = false;
                        jQuery(errorMessageClass).removeClass('hidden');
                        if(!scrollToElement){
                            scrollToElement = jQuery(selector);
                        }
                    }
                }
                jQuery(selector).css('border-color',border);
            break;
            case 'select':
                selector = 'select#'+key;
                // console.log(selector);
                inputValue = jQuery(selector).val();
                objValues[key] = inputValue;
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                jQuery(selector).css('border-width','0');
                if(!inputValue){
                    if(required){
                        border = 'red';
                        currentStepValidation = false;
                        jQuery(selector).css('border-width','1px');
                        jQuery(errorMessageClass).removeClass('hidden');
                        if(!scrollToElement){
                            scrollToElement = jQuery(selector);
                        }
                    }
                }
                jQuery(selector).css('border-color',border);
            break;
            case 'textarea':
                selector = 'textarea#'+key;
                // console.log(selector);
                inputValue = jQuery(selector).val();
                objValues[key] = inputValue;
                errorMessageClass = '.requiredMessage.'+key
                jQuery(errorMessageClass).addClass('hidden');
                if(!inputValue){
                    if(required){
                        border = 'red';
                        currentStepValidation = false;
                        jQuery(errorMessageClass).removeClass('hidden');
                        if(!scrollToElement){
                            scrollToElement = jQuery(selector);
                        }
                    }
                }
                jQuery(selector).css('border-color',border);
            break;
        }
    });
    // console.log(fieldsetCounter);
    if(currentStepValidation){
        var allFieldsets = jQuery('.application-form--fieldset');
        nextFieldSet = fieldsetCounter + 1;
        // console.log(allFieldsets);
        nextFieldSet = fieldsetCounter + 1;
        if(jQuery(event.target).hasClass('submitApplication')){
            jQuery('#applicationForm').submit();
        } else {
            jQuery(fieldset).removeClass('active');
            jQuery(allFieldsets[nextFieldSet]).addClass('active');
            scrollTo = jQuery(allFieldsets[nextFieldSet]).offset().top - 100;
        }
    } else {
        // console.log('scrollToElement');
        // console.log(scrollToElement);
        // console.log(scrollToElement[0]);
        // console.log(jQuery(scrollToElement));
        // console.log(jQuery(scrollToElement)[0]);
        scrollTo = scrollToElement.offset().top - 100;
        scrollToElement.focus();
    }
    
    jQuery('html, body').animate({
        scrollTop: scrollTo
    }, 2000);
});

function isValidPostcode(postcode) { 
    var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i; 
    return postcodeRegEx.test(postcode);
}

function isValidateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidateNationalInsurance(nationalInsurance) {
    const re = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/;
    return re.test(String(nationalInsurance).toLowerCase());
}

jQuery( document ).ready(function() {
    jQuery( "#date_of_birth" ).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0", // last hundred years
        defaultDate: '-20y',
        onSelect: function(dateText, inst) {
            jQuery(this).focus();
        }
    });
});

jQuery( document ).ready(function() {
    const menuBtn = document.querySelector(".menu-btn");  
    // const menuBranding = document.querySelector(".menu-branding");
    // const navItems = document.querySelectorAll(".nav-item");
    // console.log(menuBtn);
    let showMenu = false; 
    menuBtn.addEventListener("click", toggleMenu); 
    
    function toggleMenu() { 
        if (!showMenu) { 
            menuBtn.classList.add("close"); 
            jQuery(".showMobileMenu").show(500); 
            // menuBranding.classList.add("show"); 
            // navItems.forEach((item) => 
            //     item.classList.add("show")); 

            // Reset the menu state 
            showMenu = true; 
        } else { 
            menuBtn.classList.remove("close");  
            jQuery(".showMobileMenu").hide(500); 
            // menuBranding.classList.remove("show"); 
            // navItems.forEach((item) => 
            //     item.classList.remove("show")); 

            // Reset the menu state 
            showMenu = false; 
        } 
    } 
});