import { db } from "../firebase";
import { SET_USERS_TIME_LIST, SET_USER_WORK_TILL_NOW, SET_USER_YESTERDAY_AND_TODAY_PUNCH } from "./types";

import { toast } from "react-toastify";

/** @desc function for fetching user timing data from firebase */
export const GetUserTimingData = () => (dispatch, getState) => {
	const { user } = getState().auth_store;
	const userId = user.id;

	db.collection(userId)
		.orderBy("entry", "desc")
		.onSnapshot((querySnapshot) => {
			const timeList = [];
			let i = 0;
			let totalHour = null;
			let hour = 0;
			let min = 0;

			querySnapshot.forEach((doc) => {
				const day = doc.id;
				const newDay = `${day.substring(0, 4)}-${day.substring(4, 6)}-${day.substring(6)}`;
				let hourDone = null;
				let extraTime = null;

				// calc hour done using entry and exit time
				if (!!doc.data().entry && !!doc.data().exit) {
					let ms = Math.abs(doc.data().entry - doc.data().exit);
					hourDone = _msToTime(ms);
					extraTime = _calculateExtraTime(hourDone);
					totalHour += 9;
					const splitHourDone = hourDone.split(":");
					hour += parseInt(splitHourDone[0]);
					min += parseInt(splitHourDone[1]);
				}

				const timeData = {
					id: Date.now() + i,
					day: newDay,
					entry: doc.data().entry || "",
					exit: doc.data().exit || "",
					hourDone: hourDone || "",
					extraTime: extraTime || "",
				};

				timeList.push(timeData);
				i++;
			});

			dispatch({ type: SET_USERS_TIME_LIST, data: timeList });
			dispatch({ type: SET_USER_WORK_TILL_NOW, data: { totalHour, hour, min } });
			dispatch({ type: SET_USER_YESTERDAY_AND_TODAY_PUNCH });
		});
};

/** @desc function saving entry and exit punch timing of user to firebase */
export const CreateEntryOrExitTime = (punchTime, punchType) => (dispatch, getState) => {
	const { auth_store, time_store } = getState();
	const { user } = auth_store;

	const userId = user.id;

	const today = _getPunchDate(punchTime);

	if (!punchType) {
		const { timeData } = time_store;

		const isTimeAlreadyEntered = timeData.some((time) => {
			if (time.day.replaceAll("-", "") === today) {
				return !!time.entry;
			}
			return false;
		});

		punchType = isTimeAlreadyEntered ? "exit" : "entry";
	}

	// dispatch that you made changes to timeyarn

	return db
		.collection(userId)
		.doc(today)
		.set(
			{
				[punchType]: punchTime,
				timeStamp: new Date(),
			},
			{ merge: true }
		)
		.then(() => {
			toast.success("successfully time added");
		})
		.catch((error) => {
			toast.error("error", error);
			console.error("Error writing document: ", error);
		});
};

export const CreateEntryAndExitTimeBoth = (entryTime, exitTime) => (dispatch, getState) => {
	const { user } = getState().auth_store;

	const userId = user.id;

	const today = _getPunchDate(entryTime);

	return db
		.collection(userId)
		.doc(today)
		.set({
			entry: entryTime,
			exit: exitTime,
			timeStamp: new Date(),
		})
		.then(() => {
			toast.success("successfully time added");
		})
		.catch((error) => {
			toast.error("error", error);
			console.error("Error writing document: ", error);
		});
};

/** @desc helper function for getting today date */
export const _getPunchDate = (punchTime) => {
	const date = punchTime ? new Date(punchTime) : new Date();
	const year = `${date.getFullYear()}`;
	const month = `${date.getMonth()}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
	const day = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
	return year + month + day;
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
