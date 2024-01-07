import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticateContext from "../context/authentication";

const Modal = ({ isOpen, onClose }) => {
	const navigate = useNavigate();
	const { setAuthenticatedState } = useContext(AuthenticateContext);

	const handleSignout = async () => {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
			method: "GET",
			credentials: "include",
		});
		const data = await res.json();
		if (data.success) {
			onClose();
			setAuthenticatedState((prevState) => ({
				...prevState,
				isAuthenticated: false,
			}));
			navigate("/");
		}
	};

	return (
		<>
			{isOpen && (
				<div className="modal-overlay" onClick={onClose}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						{/* Modal content goes here */}
						{/* <h2>Modal Content</h2> */}
						<p>Are you sure you want to sign out?</p>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "1em",
								justifyContent: "center",
							}}
						>
							<button onClick={handleSignout}>Yes</button>
							<button onClick={onClose}>No</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
