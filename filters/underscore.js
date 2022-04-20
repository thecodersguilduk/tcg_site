module.exports = function(str){
    if (!str) return

    return str.replace(/\s+/g, '_').toLowerCase();
}