import React, { useEffect } from "react";
import { connect } from "react-redux";

import LeftSection from "../components/Time/LeftSection";
import RightSection from "../components/Time/RightSection";

import { GetUserTimingData } from "../action/timeAction";
import { LogOutUser } from "../action/authAction";

const Home = (props) => {
	useEffect(() => {
		props.Get_User_Timing_Data();
	}, []);

	return (
		<div id="app-container">
			<div id="left-section">
				<LeftSection />
			</div>
			<div id="right-section">
				<RightSection />
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	Log_Out_User: () => dispatch(LogOutUser()),
	Get_User_Timing_Data: () => dispatch(GetUserTimingData()),
});
export default connect(null, mapDispatchToProps)(Home);
