import $$ from '@utilities/selectors';

const courseDirectoryFilters = function(){
    const filters = $$.cdFilters;
    if (!filters) return;

      const parents = Array.from(document.querySelectorAll('.courseGroup'));
      const resetBtn = document.querySelector('.reset-filters');
      const courses = Array.from(document.querySelectorAll('.course-item'));
      let numberCourses = document.querySelector('.numberCourses');
      numberCourses.textContent = courses.length;
      let fieldObject = {};

      hideHeadings(parents);

      filters.addEventListener('change', e => {
         const nodeName = e.target.nodeName.toLowerCase();
         const target = join(e.target.value);
         if(!fieldObject[e.target.name]){
            fieldObject[e.target.name] = [target];
            fieldObject['type'] = nodeName;
         } else {
             if(nodeName === 'input'){
                if(e.target.checked){
                    fieldObject[e.target.name].push(join(target));
                } else if(!e.target.checked) {
                    let index = fieldObject[e.target.name].indexOf(target);
                    fieldObject[e.target.name].splice(index, 1);
                }
            } else {
                let index = fieldObject[e.target.name].indexOf(target);
                fieldObject[e.target.name].splice(index, 1);
                fieldObject[e.target.name] = [target];
            }
         }

         filterObject(fieldObject);
         displayNumCourses();
         hideHeadings(parents);

      })

      resetBtn.addEventListener('click', reset);

      function filterObject(obj){

        courses.forEach(course => {
            let show = true;
            if(obj.type === 'input'){
                for(const field in obj){
                    if(field !== 'type'){
                        if(!obj[field].some(item => Array.from(course.classList).includes(item))){
                            show = false;
                            console.log(obj[field]);
                        }

                        if(obj[field].length === 0) show = true;
                    }
                }
            } else {
                for(const field in obj){
                    if(field !== 'type'){
                        if(!obj[field].every(item => Array.from(course.classList).includes(item))){
                            show = false;
                        }
                    }
                }
            }

            if(!show){
                course.classList.add('hidden');
                course.classList.remove('flex');
            } else {
                course.classList.remove('hidden');
                course.classList.add('flex');
            }
        })

      }

      function reset(){
         fieldObject = {};
         const uncheckboxes = document.querySelectorAll('input[type=checkbox').forEach(el => el.checked = false);
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
