import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CreateEntryAndExitTime } from "../../action/timeAction";
import { Box, Button, Center, H1, Span } from "./HomeStyle";

const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ShowTime = (props) => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const setEntryTime = () => {
		props.Create_Entry_And_Exit_Time("entry", date.getTime());
	};

	const setExitTime = () => {
		props.Create_Entry_And_Exit_Time("exit", date.getTime());
	};

	return (
		<>
			<Center direction="column">
				<Span color="secondary" fs="xxlarge" fw="700" mb="xxsmall">
					{`${String(date.getDate()).length === 1 ? "0" + date.getDate() : date.getDate()}-${monthList[date.getMonth()]}-${date.getFullYear()}`}
				</Span>
				<Span color="secondary" fs="xxlarge" fw="500" mb="xsmall">
					{date.toLocaleTimeString()}
				</Span>
			</Center>
			<Box width="col_8" direction="row" js="space-between" ai="center" mtb="small">
				<Button color="white" bg="green" fs="large" width="col_4" ptb="xsmall" plr="xxsmall" br="xsmall" onClick={setEntryTime}>
					Entry
				</Button>
				<Button color="white" bg="reddish" fs="large" width="col_4" ptb="xsmall" plr="xxsmall" br="xsmall" onClick={setExitTime}>
					Exit
				</Button>
			</Box>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	Create_Entry_And_Exit_Time: (punchType, timeStamp) => dispatch(CreateEntryAndExitTime(punchType, timeStamp)),
});
export default connect(null, mapDispatchToProps)(ShowTime);

//year month date
