import React, { useState } from "react";
import { connect } from "react-redux";
import { CreateEntryAndExitTimeBoth, CreateEntryTime, CreateExitTime } from "../../action/timeAction";

import { toast } from "react-toastify";

import Button from "../common-utility/Button";

const EnterPunchTime = (props) => {
	const today = new Date();

	const [input, setInputValues] = useState({
		entry: "",
		exit: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const setEntryTime = ({ target }) => {
		// const timeStamp = new Date(today.getFullYear(), today.getMonth(), today.getDay(), target.value);
		setInputValues({ ...input, entry: target.value });
	};

	const setExitTime = ({ target }) => {
		setInputValues({ ...input, exit: target.value });
	};

	const submitTime = () => {
		if (props.todayPunch.entry && props.todayPunch.exit) {
			toast.warn("time already punched for today");
			return;
		}
		// dont submit empty data
		if (!input.entry && !input.exit) return;
		setIsLoading(true);
		if (input.entry && !input.exit) {
			// only entry time exit
			const timeStamp = getTimeStamp(input.entry);
			props.Create_Entry_Time(timeStamp).then(() => {
				setInputValues({ entry: "", exit: "" });
				setIsLoading(false);
			});
		} else if (!input.entry && input.exit) {
			// only exit time exist
			const timeStamp = getTimeStamp(input.exit);
			props.Create_Exit_Time(timeStamp).then(() => {
				setInputValues({ entry: "", exit: "" });
				setIsLoading(false);
			});
		} else {
			// when both time exit
			const entryTimeStamp = getTimeStamp(input.entry);
			const exitTimeStamp = getTimeStamp(input.exit);
			props.Create_Entry_And_Exit_Time_Both(entryTimeStamp, exitTimeStamp).then(() => {
				setInputValues({ entry: "", exit: "" });
				setIsLoading(false);
			});
		}
	};

	const getTimeStamp = (time) => {
		const splitTime = time.split(":");
		const dayToChangeTimeStamp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), splitTime[0], splitTime[1], splitTime[2]);
		return dayToChangeTimeStamp.getTime();
	};

	return (
		<div id="enter-time-box">
			<div className="input-time-box">
				<label>Enter Entry Time</label>
				<input
					type="time"
					id="appt"
					name="entry"
					step="1"
					min="09:00"
					max="18:00"
					disabled={props.todayPunch.entry && props.todayPunch.exit}
					value={input.entry}
					onChange={setEntryTime}
					required
				/>
			</div>
			<div className="input-time-box">
				<label>Enter Exit Time</label>
				<input
					type="time"
					id="appt"
					name="exit"
					step="1"
					min="09:00"
					max="18:00"
					disabled={props.todayPunch.entry && props.todayPunch.exit}
					value={input.exit}
					onChange={setExitTime}
					required
				></input>
			</div>
			<Button variant="primary" size="small" style={{ marginTop: "20px" }} disabled={isLoading} onClick={submitTime}>
				{isLoading ? <i className="fa fa-spinner fa-pulse fa-fw"></i> : "Submit"}
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	todayPunch: state.time_store.todayPunch,
});
const mapDispatchToProps = (dispatch) => ({
	Create_Exit_Time: (punchTime) => dispatch(CreateExitTime(punchTime)),
	Create_Entry_Time: (punchTime) => dispatch(CreateEntryTime(punchTime)),
	Create_Entry_And_Exit_Time_Both: (entryTime, exitTime) => dispatch(CreateEntryAndExitTimeBoth(entryTime, exitTime)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EnterPunchTime);
