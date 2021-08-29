import React from "react";
import Button from "./common-utility/Button";

const EnterPunchTime = () => {
	const submitTime = () => {
		return;
	};

	return (
		<>
			<div className="input-time-box">
				<label>Enter Entry Time</label>
				<input type="time" id="appt" name="appt" step="1" min="09:00" max="18:00" required></input>
			</div>
			<div className="input-time-box">
				<label>Enter Exit Time</label>
				<input type="time" id="appt" name="appt" step="1" min="09:00" max="18:00" required></input>
			</div>
			<Button variant="primary" size="small" style={{ marginTop: "20px" }} disabled={false} onClick={submitTime}>
				Submit
			</Button>
		</>
	);
};

export default EnterPunchTime;
