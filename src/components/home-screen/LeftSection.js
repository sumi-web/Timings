import React from "react";
import { connect } from "react-redux";
import { LogOutUser } from "../../action/authAction";
import { Box, Center, H1, H2, H3, P, Span, Table, TimeContainer } from "./HomeStyle";
import ShowTime from "./ShowTime";

const LeftSection = (props) => {
	return (
		<>
			<H1 color={700} fs="xlarge">
				{props.user.name.toUpperCase()}
				{/* {props.user.id} */}
			</H1>
			<P>{props.user.email}</P>
			<H1 color="primary" fs="xxxlarge">
				&#8211; Punch Your Time &#8211;
			</H1>
			<ShowTime />

			<TimeContainer width="col_7" bc="secondary" shadow={1}>
				<H3 color="primary">August Update</H3>
				<Center direction="row" jc="space-around">
					<Center direction="column" jc="center">
						<P>adsd</P>
						<P>efdsfd</P>
					</Center>
					<Center direction="column" jc="center">
						<P>adsd</P>
						<P>efdsfd</P>
					</Center>
				</Center>
			</TimeContainer>
			<Center direction="column" jc="center">
				<H2 color="primary" fs="large">
					You are doing good
				</H2>
				<H2 color="primary" fs="large">
					You are left behind with this much time
				</H2>
			</Center>
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth_store.user,
	topThreeTimeData: state.time_store.timeData.slice(0, 3),
});
const mapDispatchToProps = (dispatch) => ({
	Log_Out_User: () => dispatch(LogOutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LeftSection);
