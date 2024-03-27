module.exports = function(str) {
    if (!str) return;

    // Replace underscores and dashes with spaces
    let formattedStr = str.replace(/[_]/g, ' ');

    // Capitalize the first character of each word
    formattedStr = formattedStr.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });

    return formattedStr;
}