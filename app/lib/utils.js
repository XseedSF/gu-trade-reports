export const filterForms = (forms, filters, chartQuestion) => {
	//Chart Question es opcional
	let filteredForms = forms.filter(f => {
		let addForm = true;
		f.questions.forEach(function (question) {
			if (!chartQuestion || question.Id !== chartQuestion.Id) {
				filters.forEach(function (filter) {
					if (addForm && question.Id === filter.questionId) {
						switch (question.Type) {
							case "MO":
								addForm = filter.values.indexOf(question.SelectedOptionId) !== -1;
								break;
							case "YN":
								addForm = filter.values.indexOf(question.YesNoValue) !== -1;
								break;
							default:
								break;
						}
					}
				});
			}
		});
		return addForm;
	});

	return filteredForms;
};