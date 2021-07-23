import React, { useState, useEffect, createContext } from "react";
import Routes from "./components/Routes";
import { auth } from "./firebase";
import history from "./history";

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
			<UserContext.Provider value={userData}>
				<Routes userData={userData} />
			</UserContext.Provider>
		</>
	);
};

export default App;
