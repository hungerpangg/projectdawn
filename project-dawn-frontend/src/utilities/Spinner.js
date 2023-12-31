import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

function Spinner({ spinning, size }) {
	return (
		<div className={`fadeIn ${spinning ? "spinning" : ""}`}>
			<FontAwesomeIcon icon={faSync} size={size} />
		</div>
	);
}

export default Spinner;
