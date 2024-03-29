module.exports = function (str) {
	if (typeof str != 'string') return;

	switch (str) {
		case str.contains('UX Professional'):
			return 'User Experience';
			break;
		case 'Get Hired as a Software Tester':
			return 'Software Tester';
			break;
		case 'Get Hired as a Software Developer':
			return 'Software Development';
			break;
		case 'Essential Skills For Your Tech Career':
			return 'Essential Tech Skills';
			break;
		case 'Get Hired in the Tech Industry':
			return 'Work in the Tech Industry';
			break;
		case 'Software Developer Apprenticeship Level 4':
			return 'Software Developer';
			break;
		case 'Software Testing Apprenticeship Level 4':
			return 'Software Tester';
			break;
		case str.contains('DevOps'):
			return 'DevOps Engineer ';
			break;
		case 'Accessibility Apprenticeship Level 4':
			return 'Accessibility expert!';
			break;
		case 'Agile Project Management: Mastering Tech & Digital Projects':
			return 'Agile Project Manager';
		default:
			return str;
	}
};
