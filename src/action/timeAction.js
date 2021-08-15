import { db } from "../firebase";
import { SET_USERS_TIME_LIST } from "./types";

/** @desc function for fetching user timing data from firebase */
export const GetUserTimingData = () => (dispatch, getState) => {
	const { user } = getState().auth_store;
	const userId = user.id;

	db.collection(userId)
		.orderBy("entry", "desc")
		.onSnapshot((querySnapshot) => {
			const timeList = [];
			let i = 0;
			querySnapshot.forEach((doc) => {
				const day = doc.id;
				const newDay = `${day.substring(0, 4)}-${day.substring(4, 6)}-${day.substring(6)}`;
				let hourDone = null;
				let extraTime = null;
				// calc hour done using entry and exit time
				if (!!doc.data().entry && !!doc.data().exit) {
					let ms = Math.abs(doc.data().entry - doc.data().exit);
					hourDone = msToTime(ms);
					extraTime = calculateExtraTime(hourDone);
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
		});
};

/** @desc function saving entry and exit punch timing of user to firebase */
export const CreateEntryAndExitTime = (punchType, punchTime) => (dispatch, getState) => {
	const { user } = getState().auth_store;
	const userId = user.id;
	const date = new Date(punchTime);
	const year = `${date.getFullYear()}`;
	const month = `${date.getMonth()}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
	const day = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
	const today = year + month + day;

	// dispatch that you made changes to timeyarn

	db.collection(userId)
		.doc(today)
		.set(
			{
				[punchType]: punchTime,
				timeStamp: new Date(),
			},
			{ merge: true }
		)
		.then(() => {
			console.log("Document successfully written!");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
};

const msToTime = (duration) => {
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / (1000 * 60)) % 60);
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;
};

const calculateExtraTime = (hourDone) => {
	const splitHourDone = hourDone.split(":");
	let splitHour = parseInt(splitHourDone[0]);
	let splitMin = parseInt(splitHourDone[1]);
	let splitSec = parseInt(splitHourDone[2]);
	let extrahour = "";
	let extraMin = (60 - splitMin).toString().length === 1 ? `0${60 - splitMin}` : 60 - splitMin;
	let extraSec = (60 - splitSec).toString().length === 1 ? `0${60 - splitSec}` : 60 - splitSec;

	// work done in only min
	if (splitHour === 0) {
		return `-08:${extraMin}:${extraSec}`;
	}

	// work done under 9 hour
	if (Math.sign(splitHour - 9) === -1) {
		extrahour = (splitHour - 9).toString().length === 1 ? `0${splitHour - 9}` : splitHour - 9;
		return `${extrahour}:${extraMin}:${extraSec}`;
	} else if (Math.sign(splitHour - 9) === +1) {
		// work over 9 hour
		extrahour = (splitHour - 9).toString().length === 1 ? `0${splitHour - 9}` : splitHour - 9;
		return `${extrahour}:${extraMin}:${extraSec}`;
	} else {
		// extra minutes work done
		return `+00:${extraMin}:${extraMin}`;
	}
};
