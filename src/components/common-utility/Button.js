import React from "react";

const Button = ({ variant, size, ...props }) => (
	<button className={`btn-${variant}-${size}`} {...props}>
		{props.children}
	</button>
);

export default Button;
