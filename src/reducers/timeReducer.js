import { ADD_EXIT_TIME_DATA, ADD_PUNCH_TIME_DATA, SET_DAY_ID, SET_USERS_TIME_LIST, SET_USER_TIME_DATA, SET_USER_WORK_TILL_NOW, SET_USER_YESTERDAY_AND_TODAY_PUNCH } from "../action/types";
import { _getPunchDate } from "../action/timeAction";
import { db } from "../firebase";

const INITIAL_STATE = {
	timeData: [],
	totalWorkDone: { hour: 0, min: 0 },
	yesterdayPunch: {
		entry: "",
		exit: "",
	},
	todayPunch: {
		entry: "",
		exit: "",
	},
	totalHour: 0,
	selectedDayId: "",
};

export const timeReducer = (state = INITIAL_STATE, action) => {
	let newState = { ...state };

	if (action.type === SET_USER_TIME_DATA) {
		const currentDay = new Date();
		let day = "";
		let hourDone = null;
		let extraTime = null;
		let hour = 0;
		let min = 0;

		if (action.userData.timeStamp) {
			const { seconds, nanoseconds } = action.userData.timeStamp;
			// saving day as 01-01-2021 format
			day = _getDateFromTimeStamp(seconds, nanoseconds);
		}

		// calculate hour done using entry and exit time
		if (!!action.userData.entry && !!action.userData.exit) {
			let ms = Math.abs(action.userData.entry - action.userData.exit);
			hourDone = _msToTime(ms);
			extraTime = _calculateExtraTime(hourDone);
			const splitHourDone = hourDone.split(":");
			hour += parseInt(splitHourDone[0]);
			min += parseInt(splitHourDone[1]);
			if (min > 60) {
				hour += min / 60;
				min += min % 60;
			}

			hour = hour.toString().length === 1 ? `0${hour}` : `${hour}`;
			min = min.toString().length === 1 ? `0${min}` : `${min} `;
			newState.totalWorkDone.hour += hour;
			newState.totalWorkDone.min += min;
		}

		newState.totalHour += 9;

		const timeInfo = {
			id: action.docId,
			day,
			entry: action.userData.entry || "",
			exit: action.userData.exit || "",
			hourDone: hourDone || "",
			extraTime: extraTime || "",
		};

		newState.timeData = [timeInfo, ...state.timeData];
		// when entry time exit for current day
		if (!!timeInfo.entry && !timeInfo.exit) {
			const entryTime = new Date(timeInfo.entry);
			if (currentDay.getDate() === entryTime.getDate()) {
				newState.selectedDayId = timeInfo.id;
			}
		}

		return newState;
	}

	if (action.type === ADD_EXIT_TIME_DATA) {
		newState.timeData = state.timeData.map((doc) => {
			if (doc.id === state.selectedDayId) {
				doc.exit = action.exitTime;
				if (!!doc.entry && !!doc.exit) {
					let ms = Math.abs(doc.entry - action.exitTime);
					let hourDone = _msToTime(ms);
					let extraTime = _calculateExtraTime(hourDone);
					const splitHourDone = hourDone.split(":");
					let hour = parseInt(splitHourDone[0]);
					let min = parseInt(splitHourDone[1]);
					if (min > 60) {
						hour += min / 60;
						min += min % 60;
					}

					hour = hour.toString().length === 1 ? `0${hour}` : `${hour}`;
					min = min.toString().length === 1 ? `0${min}` : `${min} `;
					newState.totalWorkDone.hour += hour;
					newState.totalWorkDone.min += min;
					doc.hourDone = hourDone;
					doc.extraTime = extraTime;
				}
			}

			return doc;
		});

		newState.selectedDayId = "";
		return newState;
	}

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

	if (action.type === ADD_PUNCH_TIME_DATA) {
		newState.timeData = [action.punchData, ...state.timeData];
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

const _getDateFromTimeStamp = (sec, nanoSec) => {
	const miliSeconds = (sec + nanoSec / 1000000000) * 1000;
	const date = _getPunchDate(miliSeconds);
	return `${date.substring(0, 2)}-${date.substring(2, 4)}-${date.substring(4)}`;
};

/** @desc helper function for converting ms to time */
const _msToTime = (duration) => {
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / (1000 * 60)) % 60);
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;
};

/** @desc helper function for calculating extra time */
const _calculateExtraTime = (hourDone) => {
	const splitHourDone = hourDone.split(":");
	let splitHour = parseInt(splitHourDone[0]);
	let splitMin = parseInt(splitHourDone[1]);
	let splitSec = parseInt(splitHourDone[2]);
	let extraHour = "";
	let extraMin = (60 - splitMin).toString().length === 1 ? `0${60 - splitMin}` : 60 - splitMin;
	let extraSec = (60 - splitSec).toString().length === 1 ? `0${60 - splitSec}` : 60 - splitSec;

	// work done in only min
	if (splitHour === 0) {
		return `-08:${extraMin}:${extraSec}`;
	}

	// work done under 9 hour
	if (Math.sign(splitHour - 9) === -1) {
		extraHour = (splitHour - 9).toString().length === 1 ? `0${splitHour - 9}` : splitHour - 9;
		return `${extraHour}:${extraMin}:${extraSec}`;
	} else if (Math.sign(splitHour - 9) === +1) {
		// work over 9 hour
		extraHour = (splitHour - 9).toString().length === 1 ? `0${splitHour - 9}` : splitHour - 9;
		return `${extraHour}:${extraMin}:${extraSec}`;
	} else {
		// extra minutes work done
		return `+00:${extraMin}:${extraMin}`;
	}
};
