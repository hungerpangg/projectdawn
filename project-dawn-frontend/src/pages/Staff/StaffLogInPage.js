import { useState, useContext } from "react";
import AuthenticateContext from "../../context/authentication";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { setAuthenticatedState } = useContext(AuthenticateContext);

	console.log(process.env.REACT_APP_API_URL, "processenv");

	const handleLogin = async () => {
		// Implement your login logic here (e.g., make an API request)

		// For simplicity, let's just check if email and password are not empty
		if (email && password) {
			try {
				const res = await fetch(
					`${process.env.REACT_APP_API_URL}/staff/login`,
					{
						method: "POST",
						body: JSON.stringify({ email, password }),
						headers: { "Content-Type": "application/json" },
						credentials: "include",
					}
				);
				const data = await res.json();
				console.log(data, "data");
				const {
					data: { role, name },
				} = data;
				if (data.success) {
					navigate("/staff/home");
					setAuthenticatedState((prevState) => ({
						...prevState,
						isAuthenticated: true,
						userType: "staff",
						staffRole: role,
						email,
						name,
					}));
				}
			} catch (err) {
				console.log(err, "Login failed");
			}
		} else {
			setError("Please enter both email and password.");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<div>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}

export default StaffLogin;
