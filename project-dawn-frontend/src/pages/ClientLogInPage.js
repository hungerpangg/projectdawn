import { useState, useContext } from "react";
import AuthenticateContext from "../context/authentication";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { setAuthenticatedState } = useContext(AuthenticateContext);

	const handleLogin = async () => {
		// Implement your login logic here (e.g., make an API request)

		// For simplicity, let's just check if email and password are not empty
		if (email && password) {
			try {
				const res = await fetch("https://api.projectdawn-sequence.com/login", {
					method: "POST",
					body: JSON.stringify({ email, password }),
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				});
				const data = await res.json();
				const {
					data: { company },
				} = data;
				if (data.success) {
					navigate("/home");
					setAuthenticatedState((prevState) => ({
						...prevState,
						isAuthenticated: true,
						companyId: company,
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

export default Login;
