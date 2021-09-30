import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditPunchedTimeData } from "../../action/timeAction";

import Button from "../common-utility/Button";
import Modal from "../common-utility/Modal";

const EditPunchedTime = ({ isOpen, closeModal, ...props }) => {
	const [input, setInputValues] = useState({
		entry: props.toEditTimeData.entry || "",
		exit: props.toEditTimeData.exit || "",
	});

	const [absentReason, setAbsentReason] = useState(props.toEditTimeData.absentReason || "");

	console.log("check outside values", input);

	useEffect(() => {
		if (Object.keys(props.toEditTimeData).length > 0) {
			setInputValues({ entry: props.toEditTimeData.entry, exit: props.toEditTimeData.exit });
			setAbsentReason(props.toEditTimeData.absentReason);
		}

		return () => {
			setInputValues({ entry: "", exit: "" });
			setAbsentReason("");
		};
	}, [props.toEditTimeData]);

	const setEntryTime = ({ target }) => {
		setInputValues({ ...input, entry: target.value });
	};

	const setExitTime = ({ target }) => {
		setInputValues({ ...input, exit: target.exit });
	};

	const editAbsentReason = ({ target }) => {
		setAbsentReason(target.value);
	};

	const submitEditedTime = () => {};

	return (
		<Modal onClose={closeModal} open={isOpen}>
			<div className="modal-body">
				<h1>Edit Your Time ({props.toEditTimeData.day})</h1>
				<i class="fa fa-times" aria-hidden="true" onClick={closeModal}></i>

				<div id="enter-time-box" className="modal-time-box">
					<div className="input-time-box">
						<label>Edit Entry Time</label>
						<input type="time" id="appt" name="entry" step="1" value={input.entry} onChange={setEntryTime} min="09:00" max="18:00" required />
					</div>
					<div className="input-time-box">
						<label>Edit Exit Time</label>
						<input type="time" id="appt" name="exit" step="1" value={input.exit} onChange={setExitTime} min="09:00" max="18:00" required></input>
					</div>
					<div>
						<label>Select Absent Reason</label>
						<select value={absentReason} onChange={editAbsentReason}>
							<option value="">--</option>
							<option value="leave">Leave</option>
							<option value="sunday">Sunday</option>
							<option value="holiday">Holiday</option>
						</select>
					</div>
				</div>
				<Button variant="primary" size="small" style={{ marginTop: "20px" }} disabled={false} onClick={submitEditedTime}>
					Submit
				</Button>
			</div>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	toEditTimeData: state.time_store.toEditTimeData,
});
const mapDispatchToProps = (dispatch) => ({
	Edit_Punched_Time_Data: (id) => dispatch(EditPunchedTimeData(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditPunchedTime);
