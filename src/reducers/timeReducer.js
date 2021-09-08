import { SET_DAY_ID, SET_USERS_TIME_LIST, SET_USER_WORK_TILL_NOW, SET_USER_YESTERDAY_AND_TODAY_PUNCH } from "../action/types";
import { _getPunchDate } from "../action/timeAction";
import { db } from "../firebase";

const INITIAL_STATE = {
	timeData: [],
	totalWorkDone: {},
	yesterdayPunch: {
		entry: "",
		exit: "",
	},
	todayPunch: {
		entry: "",
		exit: "",
	},
	totalHour: "",
	selectedDayId: "",
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
		let today = new Date();
		let yesterday = new Date();
		// get yesterday date
		yesterday.setDate(today.getDate() - 1);

		const yearlyFormatToday = _getPunchDate(today);
		const yearlyFormatYesterday = _getPunchDate(yesterday);

		const yesterdayPunchData = state.timeData.find((data) => data.day.replaceAll("-", "") === yearlyFormatYesterday);
		const todayPunchData = state.timeData.find((data) => data.day.replaceAll("-", "") === yearlyFormatToday);

		if (!!yesterdayPunchData) {
			newState.yesterdayPunch = convertTimeStampToTime(yesterdayPunchData.entry, yesterdayPunchData.exit);
		}

		if (!!todayPunchData) {
			newState.todayPunch = convertTimeStampToTime(todayPunchData.entry, todayPunchData.exit);
		}

		return newState;
	}

	if (action.type === SET_DAY_ID) {
		newState.selectedDayId = action.id;
		return newState;
	}

	return state;
};

const convertTimeStampToTime = (entry, exit) => {
	const obj = {
		entry: "",
		exit: "",
	};

	if (entry) {
		const inTime = new Date(entry);
		obj.entry = inTime.toLocaleTimeString();
	}

	if (exit) {
		const outTime = new Date(exit);
		obj.exit = outTime.toLocaleTimeString();
	}

	return obj;
};
