import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditPunchedTimeData, UpdateEditedPunchedData } from "../../action/timeAction";

import Button from "../common-utility/Button";
import Modal from "../common-utility/Modal";

const EditPunchedTime = ({ isOpen, isLocked, closeModal, ...props }) => {
	const today = new Date();

	const [input, setInputValues] = useState({
		entry: "",
		exit: "",
	});

	console.log("check input", input);

	const [absentReason, setAbsentReason] = useState("");

	const [isLoading, setIsLoading] = useState(false);

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
		setInputValues({ ...input, exit: target.value });
	};

	const editAbsentReason = ({ target }) => {
		setAbsentReason(target.value);
		if (target.value) {
			setInputValues({ entry: "", exit: "" });
		}
	};

	const submitEditedTime = () => {
		const entryTimeStamp = input.entry ? getTimeStamp(input.entry) : "";
		const exitTimeStamp = input.exit ? getTimeStamp(input.exit) : "";

		setIsLoading(true);
		props.Update_Edited_Punched_Data(entryTimeStamp, exitTimeStamp, absentReason).then(() => {
			setInputValues({ entry: "", exit: "" });
			closeModal();
			setIsLoading(false);
		});
	};

	const getTimeStamp = (time) => {
		const splitTime = time.split(":");
		const dayToChangeTimeStamp = new Date(today.getFullYear(), today.getMonth(), today.getDate(), splitTime[0], splitTime[1], splitTime[2]);
		return dayToChangeTimeStamp.getTime();
	};

	return (
		<Modal locked={isLocked} onClose={closeModal} open={isOpen}>
			<div className="modal-body">
				<h1>Edit Your Time For ({props.toEditTimeData.day})</h1>
				<i class="fa fa-times" aria-hidden="true" onClick={closeModal}></i>

				<div id="enter-time-box" className="modal-time-box">
					<div className="input-time-box">
						<label>Edit Entry Time</label>
						<input
							type="time"
							id="appt"
							name="entry"
							step="1"
							value={input.entry}
							disabled={absentReason}
							onChange={setEntryTime}
							min="09:00"
							max="18:00"
							required
						/>
					</div>
					<div className="input-time-box">
						<label>Edit Exit Time</label>
						<input
							type="time"
							id="appt"
							name="exit"
							step="1"
							value={input.exit}
							disabled={absentReason}
							onChange={setExitTime}
							min="09:00"
							max="18:00"
							required
						></input>
					</div>
					<div className="edit-absent-box">
						<label>Edit Absent Reason</label>
						<select className="custom-select" value={absentReason} onChange={editAbsentReason}>
							<option value="">--</option>
							<option value="leave">Leave</option>
							<option value="sunday">Sunday</option>
							<option value="holiday">Holiday</option>
						</select>
					</div>
				</div>
				<Button
					variant="secondary"
					size="small"
					style={{ marginTop: "20px" }}
					disabled={isLoading || props.toEditTimeData.entry === input.entry || props.toEditTimeData.exit === input.exit}
					onClick={submitEditedTime}
				>
					{isLoading ? <i className="fa fa-spinner fa-pulse fa-fw"></i> : "Submit"}
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
	Update_Edited_Punched_Data: (entry, exit, absentReason) => dispatch(UpdateEditedPunchedData(entry, exit, absentReason)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditPunchedTime);
