import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider } from "@emotion/react";

import Routes from "./Routes";
import { auth } from "./firebase";
import history from "./history";

const theme = {
	colors: {
		primary: "#54436b",
		secondary: "#a03c78",
		third: "#93d9a3",
		lightYellow: "#cdf3a2;",
		orange: "#ed8e7c",
	},

	grey: {
		100: "#EAEAEA",
		200: "#C9C5C5",
		300: "#888",
		400: "#666",
	},
	breakPoints: {
		vs: "476px",
		sm: "576px",
		md: "768px",
		la: "992px",
		xl: "1200px",
	},
	fontSize: {
		xsmall: "0.79rem",
		small: "0.889rem",
		medium: "1rem",
		large: "1.125rem",
		xlarge: "1.266rem",
		xxlarge: "1.424rem",
	},
	spacing: {
		none: 0,
		xxsmall: "4px",
		xsmall: "8px",
		small: "12px",
		medium: "20px",
		gutter: "24px",
		large: "32px",
		xlarge: "48px",
		xxlarge: "96px",
	},
	shadow: {
		0: "none",
		1: "0px 5px 10px rgba(0, 0, 0, 0.12)",
		2: "0px 8px 30px rgba(0, 0, 0, 0.24)",
	},
};

const userCredentials = {
	user: null,
};

export const UserContext = createContext(userCredentials);

export const App = () => {
	const [userData, setUserData] = useState({ ...userCredentials });

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			console.log("fetched user");
			if (user) {
				// user found
			} else {
				//no user found
				setUserData({});
				history.push("/register");
			}
		});
	}, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<UserContext.Provider value={userData}>
					<Routes />
				</UserContext.Provider>
			</ThemeProvider>
		</>
	);
};

// min width 970px screen size larger than 970
// max width  970px screen smaller than
/**
 * .col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}
 */
