import React, { useState, useEffect, useRef } from "react";

import { Portal } from "../Portal";

export default function Modal({ open, onClose, locked, children }) {
	const backdrop = useRef(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const { current } = backdrop;

		const transitionEnd = () => setActive(open);

		const keyHandler = (e) => !locked && [27].indexOf(e.which) >= 0 && onClose();

		const clickHandler = (e) => !locked && e.target === current && onClose();

		if (current) {
			current.addEventListener("transitionend", transitionEnd);
			current.addEventListener("click", clickHandler);
			window.addEventListener("keyup", keyHandler);
		}

		if (open) {
			window.setTimeout(() => {
				document.activeElement.blur();
				setActive(open);
				document.querySelector("#root").setAttribute("inert", "true");
			}, 10);
		}

		return () => {
			if (current) {
				current.removeEventListener("transitionend", transitionEnd);
				current.removeEventListener("click", clickHandler);
			}

			document.querySelector("#root").removeAttribute("inert");
			window.removeEventListener("keyup", keyHandler);
		};
	}, [open, locked, onClose]);

	return (
		<>
			{(open || active) && (
				<Portal className="modal-portal">
					<div ref={backdrop} className={active && open && "active"}>
						<div className="modal-content">{children}</div>
					</div>
				</Portal>
			)}
		</>
	);
}
