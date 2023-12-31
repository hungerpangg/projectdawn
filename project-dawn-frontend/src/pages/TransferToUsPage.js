import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TransferToUsPage() {
	const navigate = useNavigate();
	const [state, setState] = useState({
		formDetails: {
			nameInput: "",
			directorInput: "",
			businessEntityInput: "",
			companyNameInput: "",
			citizenInput: "",
			shareholdersInput: "",
			virtualOfficeInput: "",
			servicesInput: "",
			visaInput: "",
			emailInput: "",
			passwordInput: "",
		},
		validateDetails: {
			email: "",
			password: "",
			name: "",
			country: "",
		},
		submitted: false,
	});

	const handleChange = (e) => {
		setState((prevData) => ({
			...prevData,
			formDetails: {
				...prevData.formDetails,
				[e.target.id]: e.target.value,
			},
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let nameInput = state.formDetails.nameInput;
		let directorInput = state.formDetails.directorInput;
		let businessEntityInput = state.formDetails.businessEntityInput;
		let companyNameInput = state.formDetails.companyNameInput;
		let citizenInput = state.formDetails.citizenInput;
		let shareholdersInput = state.formDetails.shareholdersInput;
		let virtualOfficeInput = state.formDetails.virtualOfficeInput;
		let servicesInput = state.formDetails.servicesInput;
		let visaInput = state.formDetails.visaInput;
		let emailInput = state.formDetails.emailInput;
		let passwordInput = state.formDetails.passwordInput;

		try {
			const res = await fetch(
				"https://projectdawn-backend.onrender.com/signup",
				{
					method: "POST",
					body: JSON.stringify({
						nameInput,
						directorInput,
						businessEntityInput,
						companyNameInput,
						citizenInput,
						shareholdersInput,
						virtualOfficeInput,
						servicesInput,
						visaInput,
						emailInput,
						passwordInput,
					}),
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				}
			);
			const data = await res.json();
			// 	if (data.redirected) {
			// 		navigate("/signup2");
			// 		const { email, userId } = data.data;
			// 		setAuthenticatedState((prevState) => ({
			// 			...prevState,
			// 			userId,
			// 		}));
			// 	}
		} catch (err) {
			console.log(err);
		}
	};

	console.log(state);

	return (
		<div>
			Sign up
			<form
				style={{
					margin: "2em",
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
				onSubmit={handleSubmit}
			>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="UENInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						Please enter the UEN of your company
					</label>
					<input type="text" id="UENInput" onChange={handleChange} />
					<button>Enter</button>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="UENInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						Please enter the UEN of your current corporate service provider
					</label>
					<input type="text" id="UENInput" onChange={handleChange} />
					<button>Enter</button>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="emailInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						Please enter your email for us to verify you
					</label>
					<input type="email" id="emailInput" onChange={handleChange} />
					<button>Verify</button>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="passwordInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						Please set a password
					</label>
					<input type="password" id="passwordInput" onChange={handleChange} />
				</div>
				<div
					style={{
						marginTop: "1em",
						marginBottom: "1em",
						padding: "1em",
						display: "flex",
						flexDirection: "column",
						gap: "1em",
						borderStyle: "ridge",
						width: "50%",
					}}
				>
					<div style={{ display: "flex", gap: "1em" }}>
						<label htmlFor="visaInput" className="form-label">
							Payment method
						</label>
						<select name="typeOfCardInput" id="typeOfCardInput" required>
							<option value="" disabled selected hidden>
								Please select an option
							</option>
							<option value="card">Card</option>
							<option value="iDeal">iDEAL</option>
							<option value="Bancontact">Bancontact</option>
						</select>
					</div>
					<div style={{ display: "flex", gap: "1em" }}>
						<label
							htmlFor="cardInput"
							className="form-label"
							style={{ marginRight: "1em" }}
						>
							Card information
						</label>
						<input type="text" id="cardInput" minLength="16" required />
					</div>
					<div style={{ display: "flex", gap: "1em" }}>
						<label
							htmlFor="CVCInput"
							className="form-label"
							style={{ marginRight: "1em" }}
						>
							CVC
						</label>
						<input
							type="text"
							id="CVCInput"
							minLength="3"
							maxLength="3"
							style={{ width: "3em" }}
							required
						/>
					</div>
					<div style={{ display: "flex", gap: "1em" }}>
						<label
							htmlFor="nameOnCardInput"
							className="form-label"
							style={{ marginRight: "1em" }}
						>
							Name on card
						</label>
						<input type="text" id="nameOnCardInput" required />
					</div>
				</div>
				<button type="submit" style={{ width: "5em" }}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default TransferToUsPage;
