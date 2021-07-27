import React, { useState, useEffect, createContext } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Routes from "./components/Routes";
import { auth } from "./firebase";
import history from "./history";

const theme = createTheme({
	palette: {
		primary: {
			main: "#54436b",
		},
		secondary: {
			main: "#a03c78",
		},
		third: {
			main: "#93d9a3",
		},
		fourth: {
			main: "#cdf3a2;",
		},
		fifth: {
			main: "#ed8e7c",
		},
	},
});

const App = () => {
	const [userData, setUserData] = useState(null);

	const UserContext = createContext(userData);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
			} else {
				setUserData({});
				history.push("/login");
			}
		});
	}, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<UserContext.Provider value={userData}>
					<Routes userData={userData} />
				</UserContext.Provider>
			</ThemeProvider>
		</>
	);
};

export default App;
