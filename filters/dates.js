/*
A date formatter filter for Nunjucks
*/
module.exports = function (date, part) {
	const parsedDate = Date.parse(date);
	if (isNaN(parsedDate)) return 'TBC';

	var d = new Date(date);
	if (part == 'year') {
		return d.getUTCFullYear();
	}
	var month = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'July',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];
	var ordinal = {
		1: 'st',
		2: 'nd',
		3: 'rd',
		21: 'st',
		22: 'nd',
		23: 'rd',
		31: 'st',
	};
	return (
		d.getDate() +
		(ordinal[d.getDate()] || 'th') +
		' ' +
		month[d.getMonth()] +
		', ' +
		d.getUTCFullYear()
	);
};
