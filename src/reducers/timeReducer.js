import { SET_USERS_TIME_LIST } from "../action/types";

const INITIAL_STATE = {
	timeData: [],
};

export const timeReducer = (state = INITIAL_STATE, action) => {
	let newState = { ...state };

	if (action.type === SET_USERS_TIME_LIST) {
		newState.timeData = action.data;
		return newState;
	}

	return state;
};
