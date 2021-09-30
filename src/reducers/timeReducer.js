import {
	ADD_EXIT_PUNCH_TIME_DATA,
	ADD_PUNCH_TIME_DATA,
	EDIT_PUNCHED_TIME_DATA,
	SET_DAY_ID,
	SET_USERS_TIME_LIST,
	SET_USER_TIME_DATA,
	SET_USER_WORK_TILL_NOW,
	SET_USER_YESTERDAY_AND_TODAY_PUNCH,
} from "../action/types";
import { _getPunchDate } from "../action/timeAction";
import { db } from "../firebase";

const INITIAL_STATE = {
	timeData: [],
	totalWorkDone: { hour: 0, min: 0, sec: 0 },
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
	toEditTimeData: {},
};

export const timeReducer = (state = INITIAL_STATE, action) => {
	let newState = { ...state };

	if (action.type === SET_USER_TIME_DATA) {
		const currentDay = new Date();
		let day = "";
		let hourDone = null;
		let extraTime = null;

		if (action.userData.timeStamp) {
			const { seconds, nanoseconds } = action.userData.timeStamp;
			// saving day as 01-01-2021 format
			day = _getDateFromTimeStamp(seconds, nanoseconds);
		}

		// calculate hour done using entry and exit time
		if (!!action.userData.entry && !!action.userData.exit) {
			let hour = +state.totalWorkDone.hour;
			let min = +state.totalWorkDone.min;
			let sec = +state.totalWorkDone.sec;

			let ms = Math.abs(action.userData.entry - action.userData.exit);
			hourDone = _msToTime(ms);
			extraTime = _calculateExtraTime(hourDone);
			// calculating total work done till now
			const splitHourDone = hourDone.split(":");
			hour += parseInt(splitHourDone[0]);
			min += parseInt(splitHourDone[1]);
			sec += parseInt(splitHourDone[2]);

			const { totalHour, totalMin, totalSec } = _calculateTotalWork(hour, min, sec);

			console.log("check min work");

			newState.totalWorkDone.hour = totalHour;
			newState.totalWorkDone.min = totalMin;
			newState.totalWorkDone.sec = totalSec;
		}

		// add day work if not absent or any holiday or sunday
		if (!action.userData.absentReason) {
			newState.totalHour += 9;
		}

		const timeInfo = {
			id: action.docId,
			day,
			entry: action.userData.entry || "",
			exit: action.userData.exit || "",
			hourDone: hourDone || "",
			extraTime: extraTime || "",
			absentReason: action.userData.absentReason,
		};

		// when entry time exit for current day
		if (!!timeInfo.entry && !timeInfo.exit) {
			const entryTime = new Date(timeInfo.entry);
			if (currentDay.getDate() === entryTime.getDate()) {
				newState.selectedDayId = timeInfo.id;
				newState.todayPunch.entry = entryTime.toLocaleTimeString();
			}
		}

		newState.timeData = [timeInfo, ...state.timeData];

		return newState;
	}

	if (action.type === ADD_EXIT_PUNCH_TIME_DATA) {
		newState.timeData = state.timeData.map((doc) => {
			if (doc.id === state.selectedDayId) {
				doc.exit = action.exitTime;
				if (!!doc.entry && !!doc.exit) {
					let hour = +state.totalWorkDone.hour;
					let min = +state.totalWorkDone.min;
					let sec = +state.totalWorkDone.sec;

					let ms = Math.abs(doc.entry - action.exitTime);
					let hourDone = _msToTime(ms);
					let extraTime = _calculateExtraTime(hourDone);
					const splitHourDone = hourDone.split(":");
					hour += parseInt(splitHourDone[0]);
					min += parseInt(splitHourDone[1]);
					sec += parseInt(splitHourDone[2]);
					const { totalHour, totalMin, totalSec } = _calculateTotalWork(hour, min, sec);

					newState.totalWorkDone.hour = totalHour;
					newState.totalWorkDone.min = totalMin;
					newState.totalWorkDone.sec = totalSec;

					doc.hourDone = hourDone;
					doc.extraTime = extraTime;
				}
			}

			return doc;
		});

		newState.selectedDayId = "";
		const exitTime = new Date(action.exitTime);
		newState.todayPunch.exit = exitTime.toLocaleTimeString();

		return newState;
	}

	if (action.type === SET_USERS_TIME_LIST) {
		newState.timeData = action.data;
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

	if (action.type === EDIT_PUNCHED_TIME_DATA) {
		if (Object.keys(state.toEditTimeData).length > 0) {
			newState.toEditTimeData = {};
		}

		const editTime = state.timeData.find((time) => time.id === action.id);

		const timeCopy = { ...editTime };

		if (!!timeCopy.entry) {
			const entryPunchTime = new Date(timeCopy.entry);
			timeCopy.entry = entryPunchTime.toLocaleTimeString("en-GB");
		}

		if (!!timeCopy.exit) {
			const exitPunchTime = new Date(timeCopy.exit);
			timeCopy.exit = exitPunchTime.toLocaleTimeString("en-GB");
		}

		newState.toEditTimeData = timeCopy;

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

	// work done in only min
	if (splitHour === 0) {
		let extraMin = splitMin === 0 ? "00" : (60 - splitMin).toString().length === 1 ? `0${60 - splitMin}` : 60 - splitMin;
		let extraSec = splitSec === 0 ? "00" : (60 - splitSec).toString().length === 1 ? `0${60 - splitSec}` : 60 - splitSec;
		return `-08:${extraMin}:${extraSec}`;
	}

	// work done under 9 hour
	if (Math.sign(splitHour - 9) === -1) {
		let extraMin = splitMin === 0 ? "00" : (60 - splitMin).toString().length === 1 ? `0${60 - splitMin}` : 60 - splitMin;
		let extraSec = splitSec === 0 ? "00" : (60 - splitSec).toString().length === 1 ? `0${60 - splitSec}` : 60 - splitSec;
		extraHour = (splitHour - 8).toString() === "0" ? `-0${splitHour - 8}` : splitHour - 8;
		return `${extraHour}:${extraMin}:${extraSec}`;
		// work above 9 hour
	} else if (Math.sign(splitHour - 9) === +1) {
		// work over 9 hour
		let extraMin = splitMin === 0 ? "00" : splitMin.toString().length === 1 ? `0${splitMin}` : splitMin;
		let extraSec = splitSec === 0 ? "00" : splitSec.toString().length === 1 ? `0${splitSec}` : splitSec;

		extraHour = (splitHour - 9).toString().length === 1 ? `0${splitHour - 9}` : splitHour - 9;
		return `+${extraHour}:${extraMin}:${extraSec}`;
	} else {
		// extra work done in either min or sec
		if (splitHour - 9 === 0) {
			let extraMin = splitMin === 0 ? "00" : splitMin.toString().length === 1 ? `0${splitMin}` : splitMin;
			let extraSec = splitSec === 0 ? "00" : splitSec.toString().length === 1 ? `0${splitSec}` : splitSec;
			return `+00:${extraMin}:${extraSec}`;
		} else {
			let extraMin = splitMin === 0 ? "00" : (60 - splitMin).toString().length === 1 ? `0${60 - splitMin}` : 60 - splitMin;
			let extraSec = splitSec === 0 ? "00" : (60 - splitSec).toString().length === 1 ? `0${60 - splitSec}` : 60 - splitSec;
			// when no extra min and sec done
			if (splitMin === 0 && splitSec === 0) {
				return `00:${extraMin}:${extraSec}`;
			}
		}
	}
};

const _calculateTotalWork = (hour, min, sec) => {
	if (sec > 60) {
		min += parseInt(sec / 60);
		sec = sec % 60;
	}
	if (min > 60) {
		hour += parseInt(min / 60);
		min = min % 60;
	}

	let totalHour = hour.toString().length === 1 ? `0${hour}` : `${hour}`;
	let totalMin = min.toString().length === 1 ? `0${min}` : `${min} `;
	let totalSec = sec.toString().length === 1 ? `0${sec}` : `${sec}`;
	return { totalHour, totalMin, totalSec };
};
