import { SET_USERS_TIME_LIST, SET_USER_WORK_TILL_NOW, SET_USER_YESTERDAY_AND_TODAY_PUNCH } from "../action/types";
import { _getPunchDate } from "../action/timeAction";

const INITIAL_STATE = {
	timeData: [],
	totalHour: "",
	totalWorkDone: {},
	yesterdayPunch: {
		entry: "",
		exit: "",
	},
	todayPunch: {
		entry: "",
		exit: "",
	},
};

export const timeReducer = (state = INITIAL_STATE, action) => {
	let newState = { ...state };

	if (action.type === SET_USERS_TIME_LIST) {
		newState.timeData = action.data;
		return newState;
	}

	if (action.type === SET_USER_WORK_TILL_NOW) {
		newState.totalHour = action.data.totalHour;
		let hour = action.data.hour;
		let min = action.data.min;
		if (min > 60) {
			hour += min / 60;
			min += min % 60;
		}
		hour = hour.toString().length === 1 ? `0${hour}` : `${hour}`;
		min = min.toString().length === 1 ? `0${min}` : `${min} `;
		newState.totalWorkDone = { hour, min };
		return newState;
	}

	if (action.type === SET_USER_YESTERDAY_AND_TODAY_PUNCH) {
		// const todayDate = _getPunchDate();
		let today = new Date();
		let yesterday = new Date();

		yesterday.setDate(today.getDate() - 1);
		// let
		// console.log("check date", typeof todayDate);
	}

	return state;
};
