import { useState } from "react";
import Spinner from "../../utilities/Spinner";

function IssueSharesForm({ type, category }) {
	const defaultFormDetails = {
		sendingRequest: false,
		formDetails: {
			shareIssueeInput: "",
			noOfSharesIssuedInput: "",
			pricePerShareInput: "",
			additionalInformationInput: "",
		},
		selectedFiles: [],
		validateDetails: {},
	};
	const [state, setState] = useState(defaultFormDetails);
	// const [selectedFiles, setSelectedFiles] = useState([]);

	const handleChange = (e) => {
		setState((prevData) => ({
			...prevData,
			formDetails: {
				...prevData.formDetails,
				[e.target.id]: e.target.value,
			},
		}));
	};

	const handleFileChange = (e) => {
		// setSelectedFiles([...selectedFiles, ...e.target.files]);
		setState((prevData) => ({
			...prevData,
			selectedFiles: [...state.selectedFiles, ...e.target.files],
		}));
	};

	const removeDocument = (e) => {
		e.preventDefault();
		const toBeRemovedFileName = e.target.parentElement.id;
		const remainingSelectedFiles = state.selectedFiles.filter((file) => {
			return file.name !== toBeRemovedFileName;
		});
		setState((prevData) => ({
			...prevData,
			selectedFiles: remainingSelectedFiles,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setState((prevData) => ({
			...prevData,
			sendingRequest: true,
		}));
		console.dir(e.target);
		const formData = new FormData(e.target);
		for (let i = 0; i < state.selectedFiles.length; i++) {
			formData.append("files", state.selectedFiles[i]);
		}
		formData.append("category", category);
		formData.append("type", type);
		for (let [key, value] of formData.entries()) {
			console.log(key, value, "entries");
		}
		try {
			const res = await fetch(
				"https://api.projectdawn-backend.onrender.com/request/issueshares",
				{
					method: "POST",
					body: formData,
					credentials: "include",
				}
			);
			setState((prevData) => ({
				...prevData,
				sendingRequest: false,
			}));
			const data = await res.json();
			if (data.success) {
				alert("Ticket has been created successfully");
				setState(defaultFormDetails);
				// setSelectedFiles([]);
			}
			// if (data.redirected) {
			// 	navigate(`/profile/${data.id}`);
			// }
		} catch (err) {
			console.log(err);
		}
	};

	console.log(state);

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				style={{
					margin: "2em",
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="shareIssueeInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						Full name of share issuee
					</label>
					<input
						type="text"
						id="shareIssueeInput"
						name="shareIssueeInput"
						value={state.formDetails.shareIssueeInput}
						onChange={handleChange}
					/>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="noOfSharesIssuedInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						No. of shares to be issued
					</label>
					<input
						type="number"
						id="noOfSharesIssuedInput"
						name="noOfSharesIssuedInput"
						value={state.formDetails.noOfSharesIssuedInput}
						style={{ width: "4em" }}
						onChange={handleChange}
					/>
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="pricePerShareInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						Price per share (SGD)
					</label>
					<input
						type="number"
						id="pricePerShareInput"
						name="pricePerShareInput"
						value={state.formDetails.pricePerShareInput}
						style={{ width: "4em" }}
						onChange={handleChange}
					/>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
						<label htmlFor="documentsInput" className="font-weight-bold">
							Include supporting documents if applicable
						</label>
						<input
							type="file"
							multiple
							onChange={handleFileChange}
							id="documentsInput"
							// name="documentsInput"
						/>
					</div>
					<ul className="listOfFileNames">
						{state.selectedFiles.length > 0 && (
							<b style={{ display: "block", marginBottom: "1em" }}>
								Files to be uploaded:
							</b>
						)}
						{state.selectedFiles.map((file, index) => {
							return (
								<li key={index} id={file.name} style={{ padding: "3px 0" }}>
									{file.name}
									<button
										style={{ "margin-left": "1em" }}
										onClick={removeDocument}
									>
										Remove
									</button>
								</li>
							);
						})}
					</ul>

					{/* <button type="submit">Submit Request</button> */}
				</div>
				<div style={{ display: "flex", gap: "1em" }}>
					<label
						htmlFor="shareIssueeInput"
						className="form-label"
						style={{ marginRight: "1em" }}
					>
						Any additional information
					</label>
					<input
						type="text"
						id="additionalInformationInput"
						name="additionalInformationInput"
						value={state.formDetails.additionalInformationInput}
						onChange={handleChange}
					/>
				</div>
				<button type="submit" className="submit-ticket-btn">
					{state.sendingRequest ? (
						<Spinner size="lg" spinning={true} />
					) : (
						"Submit Request"
					)}
				</button>
			</form>
		</div>
	);
}

export default IssueSharesForm;
