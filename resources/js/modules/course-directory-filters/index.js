import $$ from '@utilities/selectors';

const courseDirectoryFilters = function(){

    if (!$$.cd-filters-form) return;

      const parents = Array.from(document.querySelectorAll('.courseGroup'));
      const filters = document.querySelector('.cd-filters-form');
      const resetBtn = document.querySelector('.reset-filters');
      const courses = Array.from(document.querySelectorAll('.course-item'));
      let numberCourses = document.querySelector('.numberCourses');
      numberCourses.textContent = courses.length;
      let fieldArray = [];

      hideHeadings(parents);

      filters.addEventListener('change', e => {
         const nodeName = e.target.nodeName.toLowerCase();

         if(nodeName === 'select'){
            const optionsText = [];
            const options = Array.from(e.target.options).forEach(option => optionsText.push(join(option.innerText)));

           if(!optionsText.some(item => fieldArray.includes(item))){
               fieldArray.push(join(e.target.value));
           } else if (optionsText.some(item => fieldArray.includes(item)) && !fieldArray.includes(join(e.target.value))) { //one of the options is in the array but not the one we are clicking)
              fieldArray.forEach(field => {
                 if(optionsText.some(item => fieldArray.includes(item))){
                    const index = fieldArray.indexOf(field);
                    fieldArray.splice(index, 1);
                    fieldArray.push(join(e.target.value));
                 };
              })

           }
         }

         if(nodeName === 'input' && e.target.checked){
            fieldArray.push(join(e.target.value));
         } else if (nodeName === 'input' && !e.target.checked) {
            let index = fieldArray.indexOf(join(e.target.value));
            fieldArray.splice(index, 1);
         }

         courses.forEach(course => {
           if(fieldArray.some(item => Array.from(course.classList).includes(item))){
            course.classList.remove('hidden');
            course.classList.add('flex');
           } else {
            course.classList.add('hidden');
            course.classList.remove('flex');
           }
         })

        displayNumCourses();
        hideHeadings(parents);

        if(fieldArray.length === 0){
         reset()
        }

      })

      resetBtn.addEventListener('click', reset);

      function reset(){
         fieldArray = [];
         const courseItems = Array.from(document.querySelectorAll('.course-item'));
         courseItems.forEach(course => {
            course.classList.remove('hidden');
            course.classList.add('flex');
         })

         displayNumCourses();
      }

      function displayNumCourses(){
         const coursesShown = Array.from(document.querySelectorAll('.course-item.flex'));
         return numberCourses.textContent = coursesShown.length;
      }

      function join(string){
         return string.replace(/\s+/g, '-').toLowerCase();
      }

      function hideHeadings(arr){
         arr.forEach(item => {
            const heading = item.children[0]
            const divscontaininghidden = item.querySelectorAll('.course-item.hidden');
            if(item.children.length < 2 || divscontaininghidden.length === item.children.length - 1){
               heading.classList.add('hidden')
            } else {
               heading.classList.remove('hidden')
            }
         })
      }
}()

export default courseDirectoryFilters;
