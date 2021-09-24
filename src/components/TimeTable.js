import React from "react";
import { connect } from "react-redux";

import Modal from "./common-utility/Modal";

const TimeTable = (props) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<>
			<table className="styled-table" color="secondary">
				<thead>
					<tr>
						<th>Date</th>
						<th>In-Time</th>
						<th>Out-Time</th>
						<th>Hour Done</th>
						<th>Extra Time</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{props.timeData.map((timeInfo, i) => (
						<WrappedComponent timeInfo={timeInfo} index={i} key={timeInfo.id} toggleModal={() => setIsOpen(!isOpen)} />
					))}
				</tbody>
			</table>
			<Modal
				onClose={() => {
					setIsOpen(false);
				}}
				open={isOpen}
			>
				<p>I'm a modal window, I use portal so I only exist when I'm open.</p>
				<p>Also tabbing is locked inside me go ahead and try tabbing to the button behind me.</p>
				<p style={{ textAlign: "center" }}>
					<button
						onClick={() => {
							setIsOpen(false);
						}}
					>
						Close
					</button>
				</p>
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => ({
	timeData: state.time_store.timeData,
});
export default connect(mapStateToProps)(TimeTable);

const WrappedComponent = ({ timeInfo, index, toggleModal }) => {
	let inTime = "";
	let outTime = "";

	if (!!timeInfo.entry) {
		const newDate = new Date(timeInfo.entry);
		inTime = newDate.toLocaleTimeString();
	}

	if (!!timeInfo.exit) {
		const newDate = new Date(timeInfo.exit);
		outTime = newDate.toLocaleTimeString();
	}

	return (
		<tr className={(index + 1) % 2 === 0 ? "active-row" : ""}>
			<td>{timeInfo.day}</td>
			<td>{inTime}</td>
			<td>{outTime}</td>
			<td>{timeInfo.hourDone}</td>
			<td style={timeInfo.extraTime.slice(0, 1) === "+" ? { color: "#8cc152" } : timeInfo.extraTime.slice(0, 1) === "-" ? { color: "#ff0000" } : { color: "#a03c78" }}>{timeInfo.extraTime}</td>
			<td className="edit-icon">
				<i className="fa fa-pencil-square-o" aria-hidden="true" onClick={toggleModal}></i>
			</td>
		</tr>
	);
};
