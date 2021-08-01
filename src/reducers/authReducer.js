import { SET_USER_CREDENTIALS } from "../action/types";

const INITIAL_STATE = {
	user: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
	let newState = { ...state };

	if (action.type === SET_USER_CREDENTIALS) {
		newState.user = { ...action.user };
		return newState;
	}

	return state;
};
