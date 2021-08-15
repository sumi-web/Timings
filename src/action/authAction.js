import { RESET_INITIAL_STATE_DATA, SET_SCREEN_LOADER, SET_USER_CREDENTIALS } from "./types";

import { auth } from "../firebase";
import history from "../history";

import { toast } from "react-toastify";

/** @desc listener for tracking user state changes */
export const GetUserCredentials = () => (dispatch, getState) => {
	dispatch({ type: SET_SCREEN_LOADER, value: true });
	const { user: existingUser } = getState().auth_store;

	auth.onAuthStateChanged((userDetails) => {
		// user found
		if (userDetails) {
			if (existingUser === null) {
				console.log("found user", userDetails);
				const user = {
					name: userDetails.displayName,
					email: userDetails.email,
					id: userDetails.uid,
				};

				dispatch({ type: SET_USER_CREDENTIALS, user });
				history.push("/home");
			}
		} else {
			//no user found saving empty empty data
			dispatch({ type: SET_USER_CREDENTIALS, user: {} });
			history.push("/register");
		}

		dispatch({ type: SET_SCREEN_LOADER, value: false });
	});
};

export const RegisterUser = (inputValues) => (dispatch) => {
	return auth
		.createUserWithEmailAndPassword(inputValues.email, inputValues.password)
		.then((userCredential) => {
			// Signed in
			const userDetails = userCredential.user;
			// ...
			toast.success("Registered Successfully");
			userDetails
				.updateProfile({
					displayName: inputValues.name,
				})
				.then(() => {
					// name Update successful
					const user = {
						name: userDetails.displayName,
					};

					dispatch({ type: SET_USER_CREDENTIALS, user });
				})
				.catch((error) => {
					console.log("error in register", error);
					toast.error(error.message);
				});
		})
		.catch((error) => {
			console.log("error in register", error);
			toast.error(error.message);
		});
};

export const LogOutUser = () => (dispatch) => {
	return auth
		.signOut()
		.then(() => {
			// Sign-out successful.
			// dispatch({ type: RESET_INITIAL_STATE_DATA });
			toast.success("Logged Out Successfully");
		})
		.catch((error) => {
			// An error happened.
			toast.error(error.message);
		});
};

export const LoginUser = (inputValues) => (dispatch) => {
	return auth
		.signInWithEmailAndPassword(inputValues.email, inputValues.password)
		.then(() => {
			// Signed in
			toast.success("Logged In Successfully");
		})
		.catch((error) => {
			var errorCode = error.code;

			toast.error(error.message);
		});
};
