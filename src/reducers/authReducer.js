import { RESET_INITIAL_STATE_DATA, SET_USER_CREDENTIALS } from "../action/types";

const INITIAL_STATE = {
	user: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
	let newState = { ...state };

	if (action.type === SET_USER_CREDENTIALS) {
		//updating user with name
		if (!!action.user.name) {
			newState.user = { ...state.user, ...action.user };
		} else {
			newState.user = { ...action.user };
		}
		return newState;
	}

	if (action.type === RESET_INITIAL_STATE_DATA) {
		return INITIAL_STATE;
	}

	return state;
};
