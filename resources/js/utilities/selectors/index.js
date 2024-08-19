import courseGridSlider from "../../modules/course-grid-slider"
import submenu from "../../modules/submenu"

const $$ = {

    courseApply         : document.getElementById('courseApply'),

    applyBtnSubmit      : document.getElementById('apply-btn-submit'),

    body                : document.querySelector('body'),

    wrapper             : document.getElementById('wrapper'),

    header              : document.getElementById('header'),

    courseCTAHeader     : document.getElementById('course-cta-header'),

    nav                 : document.getElementById('nav'),

    hero                : document.getElementById('hero'),

    main                : document.getElementById('main'),

    containerCentre     : document.getElementById('container-centre'),

    containerRight      : document.getElementById('container-right'),

    preFooter           : document.getElementById('pre-footer'),

    footer              : document.getElementById('footer'),

    navLinks            : document.getElementById('nav-links'),

    navToggle           : document.getElementById('nav-toggle'),

    mobileNavContainer  : document.querySelector('.mobile-nav-container'),

    toggleShowHide      : document.querySelectorAll('.toggle-show-hide'),

    contactForm         : document.getElementById('contact-form'),

    applyFormSubmit     : document.querySelector('.apply-form-submit'),

    expressionInterestForm: document.getElementById('expression-of-interest'),

    inputFields         : document.querySelectorAll('.form-input-field'),

    nameInput           : document.getElementById('name'),

    emailInput          : document.getElementById('email'),

    phoneNumberInput    : document.getElementById('phone'),

    messageInput        : document.getElementById('message'),

    formError           : document.querySelectorAll('.form-error'),

    requiredFields      : document.querySelectorAll('.required'),

    requiredPopUp       : document.querySelector('.required-pop-up'),

    submitBtn           : document.getElementById('submit'),

    regexInputs         : document.querySelectorAll('[data-regex]'),

    postContainer       : document.getElementById('posts-container'),

    blogPostList        : document.querySelectorAll('[data-post]'),

    loadMoreBtn         : document.getElementById('load-more'),

    scrollTopBtn        : document.getElementById('scroll-top'),

    faqSection          : document.querySelector('.faq'),

    vacancies           : document.querySelector('.vacancies'),

    submenu             : document.querySelectorAll('li.has-submenu'),

    stripeCheckoutBtn   : document.getElementById('buy-now-btn'),

    stripeForm          : document.querySelector('.stripe-form'),

    courseDirectoryTabs : document.querySelectorAll('.course-directory-tab'),

    courseGridContainer : document.querySelector('.course-grid-container'),

    courseDirectoryGridItems : document.querySelectorAll('.course-directory-grid'),

    courseGridSlider    : document.querySelector('#course-grid')
}

export default $$
