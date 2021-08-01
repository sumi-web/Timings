import React, { useEffect } from "react";
import { connect } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@emotion/react";

import Routes from "./Routes";

import { GetUserCredentials } from "./action/authAction";

const theme = {
	colors: {
		primary: "#512D6D",
		secondary: "#a03c78",
		third: "#93d9a3",
		orange: "#ed8e7c",
		reddish: "#F8485E",
		blue: "#00C1D4",
		white: "#fff",
		red: "#c80000",
		100: "#EAEAEA",
		200: "#C9C5C5",
		300: "#888",
		400: "#666",
		500: "#444",
		600: "#434343",
		700: "#333",
		800: "#232323",
		900: "#222",
		1000: "#111",
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

	widthSize: {
		col_1: "8.33%",
		col_2: "16.66%",
		col_3: "25%",
		col_4: "33.33%",
		col_5: "41.66%",
		col_6: "50%",
		col_7: "58.33%",
		col_8: "66.66%",
		col_9: "75%",
		col_10: "83.33%",
		col_11: "91.66%",
		col_12: "100%",
	},
};

const App = (props) => {
	useEffect(() => {
		props.Get_User_Credentials();
	}, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
			<ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	Get_User_Credentials: () => dispatch(GetUserCredentials()),
});
export default connect(null, mapDispatchToProps)(App);

// min width 970px screen size larger than 970
// max width  970px screen smaller than 970

/**
 * mt,mr,mb,ml for margin
 * fs fontSize
 *
 */
