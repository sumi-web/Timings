import { SET_USER_CREDENTIALS } from "./types";

import { auth } from "../firebase";
import history from "../history";

import { toast } from "react-toastify";

/** @desc listener for tracking user state changes */
export const GetUserCredentials = () => (dispatch, getState) => {
	const { user: existingUser } = getState().auth_store;

	auth.onAuthStateChanged((userDetails) => {
		console.log("fetched user");
		if (userDetails) {
			// user found
			console.log("user found", userDetails);
			if (existingUser === null) {
				const user = {
					name: userDetails.displayName,
					email: userDetails.email,
				};

				dispatch({ type: SET_USER_CREDENTIALS, user });
				history.push("/home");
			}
		} else {
			//no user found saving empty empty data
			const user = {};
			dispatch({ type: SET_USER_CREDENTIALS, user });
			history.push("/register");
		}
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
					// Update successful
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

export const LogOutUser = () => () => {
	return auth
		.signOut()
		.then(() => {
			// Sign-out successful.
			toast.success("Logged Out Successfully");
		})
		.catch((error) => {
			// An error happened.
			toast.error(error.message);
		});
};

export const LoginUser = (inputValues) => () => {
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
