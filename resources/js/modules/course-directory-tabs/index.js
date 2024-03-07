import $$ from '@utilities/selectors';

const inactiveClasses = 'course-directory-tab text-xl font-bold text-grey-1000 cursor-pointer';
const activeClasses = 'course-directory-tab text-xl font-bold text-blue-100 border-b-2 border-blue-100 cursor-pointer';

function init(){
    $$.courseDirectoryTabs[0].classList = activeClasses;
    $$.courseDirectoryGridItems[0].classList.remove('hidden');
}

function findTallestCourse(courses){
    let tallestCourse = 0;
    courses.forEach(course => {
        if (course.offsetHeight> tallestCourse) {
            tallestCourse = course.clientHeight;
        }
    });
    return tallestCourse;
}


function setTabClasses(target){
    $$.courseDirectoryTabs.forEach(tab => {
        if(tab.dataset.target !== target){
            tab.classList = inactiveClasses;
        } else {
            tab.classList = activeClasses;
        }
    });
}

function setSection(target){
    $$.courseDirectoryGridItems.forEach(item => {
        if(item.id !== target){
            item.classList.add('hidden');
        } else {
            item.classList.remove('hidden');
        }
    });
}

const handleTabs = function(){
    if(!$$.courseDirectoryTabs) return;

    init();

    $$.courseDirectoryTabs.forEach(tab => {
        tab.addEventListener('click', e => {
            e.preventDefault();
            const target = e.target.dataset.target;
            setTabClasses(target);
            setSection(target);
        })
    });
}();

export default handleTabs;