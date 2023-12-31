import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IncorporateWithUsPage() {
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
		sendEmail: false,
		verifyEmail: false,
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

	const handleSendEmailBtnClick = (e) => {
		e.preventDefault();
		let validate = validateEmail();
		if (validate) {
			setState((prevData) => ({
				...prevData,
				sendEmail: true,
			}));
		} else {
			alert("Email is invalid!");
		}
	};

	const handleVerifyEmailBtnClick = (e) => {
		e.preventDefault();
		setState((prevData) => ({
			...prevData,
			verifyEmail: true,
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
			const res = await fetch("http://localhost:3001/signup", {
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
			});
			const data = await res.json();
			if (data.redirected) {
				navigate("/home");
				// setAuthenticatedState((prevState) => ({
				// 	...prevState,
				// 	userId,
				// }));
			}
		} catch (err) {
			console.log(err);
		}
	};

	function validateEmail() {
		const emailInput = document.querySelector("#emailInput");
		// const errorMessage = document.getElementById('errorMessage');

		// Regular expression for a simple email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (emailRegex.test(emailInput.value)) {
			// Valid email format
			//   errorMessage.style.display = 'none';
			// alert("Email is valid!");
			return true;
		} else {
			// alert("Email is invalid!");
			// Invalid email format
			//   errorMessage.style.display = 'block';
			return false;
		}
	}

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
						htmlFor="nameInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						How may we address you?
					</label>
					<input type="text" id="nameInput" required onChange={handleChange} />
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label htmlFor="directorInput" className="form-label">
						Will you be a director of this new company?
					</label>
					<select
						name="directorInput"
						id="directorInput"
						onChange={handleChange}
						required
					>
						<option value="" disabled selected hidden>
							Please select an option
						</option>
						<option value="director">Yes</option>
						<option value="admin">No</option>
					</select>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label for="businessEntityInput">
						What type of business entity are you incorporating?
					</label>
					<select
						name="businessEntityInput"
						id="businessEntityInput"
						onChange={handleChange}
						required
					>
						<option value="" disabled selected hidden>
							Please select an option
						</option>
						<option value="private-limited">
							Pivate company limited by shares
						</option>
					</select>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label htmlFor="companyNameInput" className="form-label">
						What would be your new company name?
					</label>
					<input
						type="text"
						id="companyNameInput"
						required
						onChange={handleChange}
					/>
					<button class="check-availability">Check Availability</button>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label htmlFor="citizenInput" className="form-label">
						Are you a Singpore citizen or permanent resident?
					</label>
					<select
						name="citizenInput"
						id="citizenInput"
						onChange={handleChange}
						required
					>
						<option value="" disabled selected hidden>
							Please select an option
						</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label htmlFor="shareholdersInput" className="form-label">
						How many shareholders will you have?
					</label>
					<input
						style={{ width: "3em" }}
						type="number"
						id="shareholdersInput"
						required
						min="0"
						onChange={handleChange}
					/>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label htmlFor="virtualOfficeInput" className="form-label">
						Do you require us to provide you with virtual office services?
					</label>
					<select
						name="virtualOfficeInput"
						id="virtualOfficeInput"
						onChange={handleChange}
						required
					>
						<option value="" disabled selected hidden>
							Please select an option
						</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label htmlFor="servicesInput" className="form-label">
						Would you need accounting, book-keeping, tax, and/or HR services /
						CPF payroll services?
					</label>
					<select
						name="servicesInput"
						id="servicesInput"
						onChange={handleChange}
						required
					>
						<option value="" disabled selected hidden>
							Please select an option
						</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label htmlFor="visaInput" className="form-label">
						Would you need visa or immigration-related services?
					</label>
					<select
						name="visaInput"
						id="visaInput"
						onChange={handleChange}
						required
					>
						<option value="" disabled selected hidden>
							Please select an option
						</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="emailInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						Please enter your email for us to verify you
					</label>
					<div
						style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
					>
						<div style={{ display: "flex", gap: "0.5em" }}>
							<input type="email" id="emailInput" onChange={handleChange} />
							<button onClick={handleSendEmailBtnClick}>Send email</button>
						</div>
						{state.sendEmail && (
							<div style={{ display: "flex", gap: "0.5em" }}>
								<input
									placeholder="Enter verification code sent in email"
									type="email"
									id="emailVerificationInput"
									onChange={handleChange}
								/>
								<button onClick={handleVerifyEmailBtnClick}>Verify</button>
							</div>
						)}
					</div>
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

export default IncorporateWithUsPage;
