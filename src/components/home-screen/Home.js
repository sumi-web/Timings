import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LoginUser, LogOutUser } from "../../action/authAction";
import { GetUserTimingData } from "../../action/timeAction";
import { Box, Button } from "./HomeStyle";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const Home = (props) => {
	useEffect(() => {
		props.Get_User_Timing_Data();
	}, []);

	return (
		<Box width="col_12" flexWidth={1} bg="grey">
			<Box width="col_12" flexWidth={0.3} height={"100vh"} direction="column" js="flex-start" ai="center">
				<LeftSection />
				<Button bg="secondary" color="white" fs="medium" width="col_3" ptb="xsmall" plr="none" br="xsmall" shadow={1} mt="large">
					Sign Out
				</Button>
			</Box>

			<Box width="col_12" flexWidth={0.7} direction="column">
				<RightSection />
			</Box>
		</Box>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth_store.user,
	topThreeTimeData: state.time_store.timeData.slice(0, 3),
});
const mapDispatchToProps = (dispatch) => ({
	Log_Out_User: () => dispatch(LogOutUser()),
	Get_User_Timing_Data: () => dispatch(GetUserTimingData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
