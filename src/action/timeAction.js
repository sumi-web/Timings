import { db } from "../firebase";
import firebase from "firebase";
import { SET_DAY_ID, SET_USERS_TIME_LIST, SET_USER_WORK_TILL_NOW, SET_USER_YESTERDAY_AND_TODAY_PUNCH } from "./types";

import { toast } from "react-toastify";
import { batch } from "react-redux";

/** @desc function for fetching user timing data from firebase */
export const GetUserTimingData = () => (dispatch, getState) => {
	const { user } = getState().auth_store;
	const userId = user.id;
	const currentDay = new Date();

	db.collection(userId)
		.orderBy("timeStamp", "desc")
		.where("timeStamp", "<=", new Date(`${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-31`))
		.where("timeStamp", ">=", new Date(`${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-01`))
		.onSnapshot((querySnapshot) => {
			const timeList = [];
			let totalHour = null;
			let hour = 0;
			let min = 0;
			let index = 0;

			querySnapshot.forEach((doc) => {
				let day = "";
				let hourDone = null;
				let extraTime = null;

				// saving day as 01-01-2021 format
				if (doc.data().timeStamp) {
					const { seconds, nanoseconds } = doc.data().timeStamp;
					day = _getDateFromTimeStamp(seconds, nanoseconds);
				}

				// checking if entry time already punched
				if (index === 0 && !!doc.data().entry) {
					// checking if entry time was of today
					const entryTime = new Date(doc.data().entry);
					if (currentDay.getDate() === entryTime.getDate()) {
						dispatch({ type: SET_DAY_ID, id: doc.id });
					}
				}
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

				// calculate current month data

				const timeData = {
					id: doc.id,
					day,
					entry: doc.data().entry || "",
					exit: doc.data().exit || "",
					hourDone: hourDone || "",
					extraTime: extraTime || "",
				};

				timeList.push(timeData);
				index++;
			});

			batch(() => {
				dispatch({ type: SET_USERS_TIME_LIST, data: timeList });
				dispatch({ type: SET_USER_WORK_TILL_NOW, data: { totalHour, hour, min } });
				dispatch({ type: SET_USER_YESTERDAY_AND_TODAY_PUNCH });
				// dispatch({ type: "SET_CURRENT_MONTH_DATA", userId });
				FillLeftTimingsData()(dispatch, getState);
			});
		});
};

/** @desc function saving entry and exit punch timing of user to firebase */
export const CreateEntryTime = (punchTime) => (dispatch, getState) => {
	const { user } = getState().auth_store;

	const userId = user.id;

	return db
		.collection(userId)
		.add(
			{
				entry: punchTime,
				userId,
				timeStamp: new Date(),
			},
			{ merge: true }
		)
		.then((data) => {
			dispatch({ type: SET_DAY_ID, id: data.id });
			toast.success("successfully entry time added");
		})
		.catch((error) => {
			toast.error("error", error);
			console.error("Error writing document: ", error);
		});
};

export const CreateExitTime = (punchTime) => (_, getState) => {
	const {
		auth_store: { user },
		time_store: { selectedDayId },
	} = getState();

	const userId = user.id;

	// could use update method here but lets just use this one
	return db
		.collection(userId)
		.doc(selectedDayId)
		.set(
			{
				exit: punchTime,
			},
			{ merge: true }
		)
		.then(() => {
			toast.success("successfully exit time added");
		})
		.catch((error) => {
			// The document probably doesn't exist.
			toast.error("error on updating time");
			console.error("Error updating document: ", error);
		});
};

/** @desc function for saving entry and exit time together */
export const CreateEntryAndExitTimeBoth =
	(entryTime, exitTime, absentReason = "", timeStamp = firebase.firestore.FieldValue.serverTimestamp()) =>
	(dispatch, getState) => {
		const { user } = getState().auth_store;

		const userId = user.id;

		return db
			.collection(userId)
			.add({
				entry: entryTime,
				exit: exitTime,
				userId,
				absentReason,
				timeStamp,
			})
			.then(() => {
				toast.success("successfully time added");
			})
			.catch((error) => {
				toast.error("Error writing document: ", error);
				console.log("error", error);
			});
	};

/** @desc function for filling all left data by user like absent or sunday */
export const FillLeftTimingsData = () => (dispatch, getState) => {
	const { timeData } = getState().time_store;
	const lastPunchTime = timeData[0];

	const currentDate = new Date();
	const lastPunchDay = new Date(lastPunchTime.entry || lastPunchTime.exit);
	// fill when last punch
	if (lastPunchDay.getDate() < currentDate.getDate()) {
		for (let i = lastPunchDay.getDate() + 1; i < currentDate.getDate(); i++) {
			let absentReason = "leave";
			const date = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`);
			// absent reason sunday if day is 7
			if (date.getDay() === 7) {
				absentReason = "sunday";
			}

			CreateEntryAndExitTimeBoth("", "", absentReason, date)(dispatch, getState);
		}
	}
};

// update function incoming

/** @desc helper function for getting today date */
export const _getPunchDate = (punchTime) => {
	const date = punchTime ? new Date(punchTime) : new Date();
	const year = `${date.getFullYear()}`;
	const month = `${date.getMonth()}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
	const day = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
	return day + month + year;
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

const _getDateFromTimeStamp = (sec, nanoSec) => {
	const miliSeconds = (sec + nanoSec / 1000000000) * 1000;
	const date = _getPunchDate(miliSeconds);
	return `${date.substring(0, 2)}-${date.substring(2, 4)}-${date.substring(4)}`;
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
