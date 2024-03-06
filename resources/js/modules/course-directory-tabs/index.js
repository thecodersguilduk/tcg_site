import $$ from '@utilities/selectors';

const inactiveClasses = 'course-directory-tab text-xl font-bold text-grey-1000 cursor-pointer';
const activeClasses = 'course-directory-tab text-xl font-bold text-blue-100 border-b-2 border-blue-100 cursor-pointer';

function init(){
    setContainerSize('.course-directory-grid:nth-of-type(1)');
    $$.courseDirectoryTabs[0].classList = activeClasses;
    $$.courseDirectoryGridItems[0].classList.remove('opacity-0', 'left-[-100%]');
    $$.courseDirectoryGridItems[0].classList.add('opacity-100', 'left-0');;
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

function setContainerSize(section){
    const screenWidth = window.innerWidth;
    const container = $$.courseGridContainer;
    const courses = container.querySelectorAll(section + ' .grid .course');
    const tallestCourse = findTallestCourse(courses);
    let numRows;

    
    
    switch(true){
        case screenWidth > 1024:
            numRows = Math.ceil(courses.length / 3);
            break;
        case screenWidth > 768 && screenWidth <= 1024:
            numRows = Math.ceil(courses.length / 2);
            break;
        default:
            numRows = courses.length;
            break;
    }
        console.log(courses.length, numRows, tallestCourse);
        container.style.height = numRows * (tallestCourse + 64) + 'px';
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
            item.classList.remove('opacity-100');
            item.classList.add('opacity-0');
        } else {
            item.classList.remove('opacity-0');
            item.classList.add('opacity-100');
            setContainerSize('#' + target)
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