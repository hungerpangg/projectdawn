import { useState, createContext, useEffect } from "react";

const AuthenticateContext = createContext();

function Provider({ children }) {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	// const [userId, setUserId] = useState("");
	const [authenticatedState, setAuthenticatedState] = useState({
		isAuthenticated: false,
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
			const { id } = payloadObject;
			try {
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
					userId: id,
					isAuthenticated: true,
					companyId: data.company,
					name: data.name,
				}));
			} catch (err) {
				console.log("Error fetching user information");
			}
		} else {
			console.log("JWT cookie does not exist");
		}
	};

	useEffect(() => {
		getUserData();
	}, [authenticatedState.userId]);

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
