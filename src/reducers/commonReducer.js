import { SET_SCREEN_LOADER } from "../action/types";

const INITIAL_STATE = {
	showScreenLoader: false,
};

export const commonReducer = (state = INITIAL_STATE, action) => {
	let newState = { ...state };
	if (action.type === SET_SCREEN_LOADER) {
		newState.showScreenLoader = action.value;
		return newState;
	}

	return state;
};
