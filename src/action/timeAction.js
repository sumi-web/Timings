import { db } from "../firebase";
import firebase from "firebase";
import {
	ADD_EXIT_PUNCH_TIME_DATA,
	ADD_PUNCH_TIME_DATA,
	SET_DAY_ID,
	SET_USERS_TIME_LIST,
	SET_USER_TIME_DATA,
	SET_USER_YESTERDAY_AND_TODAY_PUNCH,
} from "./types";

import { toast } from "react-toastify";
import { batch } from "react-redux";

/** @desc function for fetching user timing data from firebase */
export const GetUserTimingData = () => (dispatch, getState) => {
	const { user } = getState().auth_store;
	const userId = user.id;
	const currentDay = new Date();
	db.collection(userId)
		.orderBy("timeStamp", "asc")
		.where("timeStamp", "<=", new Date(`${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-31`))
		.where("timeStamp", ">=", new Date(`${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-01`))
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// let hourDone = null;
				// let extraTime = null;

				dispatch({ type: SET_USER_TIME_DATA, docId: doc.id, userData: doc.data() });
			});

			batch(() => {
				dispatch({ type: SET_USER_YESTERDAY_AND_TODAY_PUNCH });
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
		.add({
			entry: punchTime,
			userId,
			absentReason: "",
			timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		.then((data) => {
			const docRef = db.collection(userId).doc(data.id);
			docRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						dispatch({ type: SET_USER_TIME_DATA, docId: doc.id, userData: doc.data() });
					} else {
						// doc.data() will be undefined in this case
						console.log("No such document!");
					}
				})
				.catch((error) => {
					console.log("error getting the doc:", error);
				});

			dispatch({ type: SET_DAY_ID, id: data.id });
			toast.success("successfully entry time added");
		})
		.catch((error) => {
			toast.error("error", error);
			console.error("Error writing document: ", error);
		});
};

export const CreateExitTime = (punchTime) => (dispatch, getState) => {
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
			dispatch({ type: ADD_EXIT_PUNCH_TIME_DATA, exitTime: punchTime });
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
			.then((data) => {
				const docRef = db.collection(userId).doc(data.id);

				docRef
					.get()
					.then((doc) => {
						if (doc.exists) {
							dispatch({ type: SET_USER_TIME_DATA, docId: doc.id, userData: doc.data() });
						} else {
							// doc.data() will be undefined in this case
							console.log("No such document!");
						}
					})
					.catch((error) => {
						console.log("error getting the doc:", error);
					});
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

	if (timeData.length !== 0) {
		const currentDate = new Date();
		const lastPunchTime = timeData[0];

		const swappedLastPunchDay = `${lastPunchTime.day.substring(3, 5)}-${lastPunchTime.day.substring(0, 2)}-${lastPunchTime.day.substring(6)}`;

		const lastPunchDay = new Date(swappedLastPunchDay);

		// fill after last punch date
		if (lastPunchDay.getDate() < currentDate.getDate()) {
			for (let i = lastPunchDay.getDate() + 1; i < currentDate.getDate(); i++) {
				let absentReason = "leave";
				const date = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`);
				// absent reason sunday if day is 0
				if (date.getDay() === 0) {
					absentReason = "sunday";
				}

				CreateEntryAndExitTimeBoth("", "", absentReason, date)(dispatch, getState);
			}
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
