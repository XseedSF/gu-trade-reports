//const baseUrl = 'http://localhost:8080/'
const baseUrl = 'http://192.168.1.140:8080/'

/*export const loadQuestions = () => {
	return fetch(baseUrl+'questions')
		.then(res => res.json())
}*/

export const loadFormAndCompletedForms = () => {
	return fetch(baseUrl + 'form')
		.then(res => res.json())
}