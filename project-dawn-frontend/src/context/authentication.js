import { useState, createContext, useEffect } from "react";

const AuthenticateContext = createContext();

function Provider({ children }) {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	// const [userId, setUserId] = useState("");
	const [authenticatedState, setAuthenticatedState] = useState({
		isAuthenticated: false,
		userType: "",
		email: "",
		staffRole: "",
		userId: "",
		companyId: "",
		name: "",
	});

	const checkJwtCookie = (cookieName) => {
		const cookies = document.cookie.split(";");
		for (const cookie of cookies) {
			const [name, value] = cookie.trim().split("=");
			if (name === cookieName) {
				return true; // Cookie found
			}
		}
		return false; // Cookie not found
	};

	const getUserData = async () => {
		const jwtCookieExists = checkJwtCookie("jwt");
		console.log(jwtCookieExists);
		if (jwtCookieExists) {
			console.log("JWT cookie exists");
			// Get id of jwt token
			const token = document.cookie;
			const parts = token.split(".");
			const payload = parts[1];
			const decodedPayload = window.atob(payload);
			const payloadObject = JSON.parse(decodedPayload);
			console.log(payloadObject, "payload");
			const { id, userType } = payloadObject;
			try {
				if (userType.toUpperCase() === "CLIENT") {
					const res = await fetch(
						`${process.env.REACT_APP_API_URL}/authenticationCache`,
						{
							method: "GET",
							credentials: "include",
						}
					);
					const data = await res.json();
					setAuthenticatedState((prevState) => ({
						...prevState,
						userType,
						userId: id,
						isAuthenticated: true,
						companyId: data.company,
						name: data.name,
					}));
				} else if (userType.toUpperCase() === "STAFF") {
					console.log("trying staff");
					const res = await fetch(
						`${process.env.REACT_APP_API_URL}/staff/authenticationCache`,
						{
							method: "GET",
							credentials: "include",
						}
					);
					const data = await res.json();
					setAuthenticatedState((prevState) => ({
						...prevState,
						userId: id,
						userType,
						isAuthenticated: true,
					}));
				}
			} catch (err) {
				console.log("Error fetching user information");
			}
		} else {
			console.log("JWT cookie does not exist");
		}
	};

	useEffect(() => {
		getUserData();
	}, [
		authenticatedState.userId,
		authenticatedState.isAuthenticated,
		authenticatedState.companyId,
	]);

	const valueToShare = {
		authenticatedState,
		setAuthenticatedState,
	};

	console.log(authenticatedState);

	return (
		<AuthenticateContext.Provider value={valueToShare}>
			{children}
		</AuthenticateContext.Provider>
	);
}

export { Provider };
export default AuthenticateContext;
