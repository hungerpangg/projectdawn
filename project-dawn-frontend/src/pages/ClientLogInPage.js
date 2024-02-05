import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthenticateContext from "../context/authentication";
import { useNavigate } from "react-router-dom";
import Spinner from "../utilities/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ redirect }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setAuthenticatedState } = useContext(AuthenticateContext);
	// const location = useLocation();
	// const queryParams = new URLSearchParams(location.search);
	// const signupParam = queryParams.get("redirect");

	const showToastMessage = () => {
		toast.dark("Please sign in to access Sequence", {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 2000,
			style: {
				theme: "colored",
				color: "black",
				backgroundColor: "white",
			},
		});
	};

	useEffect(() => {
		if (redirect) {
			showToastMessage();
		}
	}, []);

	const handleLogin = async () => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 3000));
		if (email && password) {
			try {
				const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
					method: "POST",
					body: JSON.stringify({ email, password }),
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				});
				setLoading(true);
				const data = await res.json();
				const {
					data: { company },
				} = data;
				if (data.success) {
					navigate("/home");
					setAuthenticatedState((prevState) => ({
						...prevState,
						userType: "client",
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

	if (loading) {
		return (
			<div style={{ height: "200px", width: "120px", margin: "25% auto" }}>
				<div
					style={{
						marginBottom: "3em",
						transform: "translate(-15px, 0)",
						overflow: "visible",
						whiteSpace: "nowrap",
						bold: "true",
					}}
				>
					<b>Logging in...</b>
				</div>
				<Spinner size="8x" spinning={true} />
			</div>
		);
	}

	return (
		<div>
			<ToastContainer />
			<button
				onClick={() => {
					navigate("/");
				}}
			>
				Back to Main
			</button>
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
