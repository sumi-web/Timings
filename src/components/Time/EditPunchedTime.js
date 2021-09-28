import React, { useState } from "react";
import { connect } from "react-redux";
import { EditPunchedTimeData } from "../../action/timeAction";

import Button from "../common-utility/Button";
import Modal from "../common-utility/Modal";

const EditPunchedTime = ({ isOpen, closeModal }) => {
	const [input, setInputValues] = useState({
		entry: "",
		exit: "",
	});

	const [absentReason, setAbsentReason] = useState();

	const submitEditedTime = () => {};

	return (
		<Modal onClose={closeModal} open={isOpen}>
			<div className="modal-body">
				<h1>Edit Your Time()</h1>
				<i class="fa fa-times" aria-hidden="true" onClick={closeModal}></i>

				<div id="enter-time-box" className="modal-time-box">
					<div className="input-time-box">
						<label>Edit Entry Time</label>
						<input type="time" id="appt" name="entry" step="1" min="09:00" max="18:00" value="" required />
					</div>
					<div className="input-time-box">
						<label>Edit Exit Time</label>
						<input type="time" id="appt" name="exit" step="1" min="09:00" max="18:00" required></input>
					</div>
					<select>
						<option value="">--</option>
						<option value="leave">Leave</option>
						<option value="sunday">Sunday</option>
						<option value="holiday">Holiday</option>
					</select>
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
