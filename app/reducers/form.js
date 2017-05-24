const form = (state = {}, action) => {
	if(action.response){
		return {
		  ...state,
		  ...action.response,
		}
	}
	return state; 
};



export default form;