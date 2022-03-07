module.exports = function(str){
    if(typeof str != 'string') return

    switch(str){
        case 'Get Hired as a UX Professional':
            return 'User Experience'
            break;
        case 'Get Hired as a Software Tester':
            return 'Software Tester'
            break;
        case 'Get Hired as a Software Developer':
            return 'Software Development'
            break;
        case 'Essential Skills For Your Tech Career':
            return 'Essential Tech Skills'
            break;
        case 'Get Hired in the Tech Industry':
            return 'Work in the Tech Industry'
            break;
        default:
            return str
    }
}