module.exports = function (str) {
	
	if (typeof str != 'string' || !str) return str;

	const comparison = str.toLowerCase().split(' ');

	switch (true) {
		case comparison.includes('ux'):
			return 'UX Level 4';
			break;
		case comparison.includes('testing'):
			return 'Software Tester Level 4';
			break;
		case comparison.includes('developer'):
			return 'Software Development Level 4';
			break;
		case comparison.includes('devops'):
			return 'DevOps Engineer Level 4';
			break;
		case comparison.includes('accessibility'):
			return 'Accessibility Apprenticeship Level 4';
			break;
		case comparison.includes('product'):
			return 'Product Management Level 4';
			break;
		case comparison.includes('projects'):
			return 'Associate Project Management Level 4';
			break;
		case comparison.includes('security'):
			return 'Cyber Security Level 4';
			break;
		case comparison.includes('data'):
			return 'Data Analyst Level 4';
			break;
			return str;
	}
};
