import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import AppointDirectorForm from "../components/corpsec/AppointDirectorForm";
import IssueSharesForm from "../components/corpsec/IssueSharesForm";
import DocumentsTable from "../components/DocumentsTable";
import AuthenticateContext from "../context/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpZA,
	faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

function AccountingPage() {
	const [selectedOption, setSelectedOption] = useState(null);
	const [documents, setDocuments] = useState([]);
	const {
		authenticatedState: { userId, companyId },
	} = useContext(AuthenticateContext);

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const category = "accounting";

	const renderSelectedComponent = () => {
		switch (selectedOption) {
			case "Appoint a Director":
				return (
					<AppointDirectorForm category={category} type={selectedOption} />
				);
			case "Issue Shares":
				return <IssueSharesForm category={category} type={selectedOption} />;
			default:
				return null;
		}
	};

	const colNames = [
		"Ticket number",
		<p>
			Name <FontAwesomeIcon icon={faArrowUpZA} className="filter-icon" />
		</p>,
		// "Uploaded by <FontAwesomeIcon icon={faArrowUpZA} />",
		<p>
			Uploaded by <FontAwesomeIcon icon={faArrowUpZA} className="filter-icon" />
		</p>,
		<p>
			Uploaded at{" "}
			<FontAwesomeIcon icon={faArrowUpWideShort} className="filter-icon" />
		</p>,
		"Source",
	];

	const getDocuments = async () => {
		try {
			const res = await fetch(
				`https://api.projectdawn-backend.onrender.com/documents?category=${category}&companyId=${companyId}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const data = await res.json();
			console.log(data);
			setDocuments(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (companyId) getDocuments();
	}, [companyId]);

	const notifications = [
		{
			title:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		},
		{
			title:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		},
	];
	const renderNotifications = notifications?.map((notification) => {
		return <div>{notification.title}</div>;
	});

	const documentsTableData = documents?.map((document) => ({
		ticketNumber: document.ticket,
		name: document.name,
		uploadedBy: document.creator.name,
		uploadedAt: document.createdAt,
		link: <a href={document.url}>Link</a>,
	}));

	const data = [
		{
			ticketNumber: 1,
			title: "Handle corp sec",
			description: "Some stuff",
			status: "In progress",
			deadline: new Date().toLocaleDateString(),
		},
		{
			ticketNumber: 2,
			title: "Handle corp sec",
			description: "Some stuff",
			status: "In progress",
			deadline: new Date().toLocaleDateString(),
		},
		{
			ticketNumber: 3,
			title: "Handle corp sec",
			description: "Some stuff",
			status: "In progress",
			deadline: new Date().toLocaleDateString(),
		},
	];

	return (
		<div>
			{/* <Sidebar /> */}
			<div
				className="dashboard-container"
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div className="each-dashboard-container">
					<h2>Accounting</h2>
					<h3>Key Financials (FY 2024)</h3>
					<div
						style={{
							border: "ridge",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div
							className="numbers-container"
							style={{
								display: "flex",
								flexDirection: "row",
								width: "100 %",
								justifyContent: "space-evenly",
							}}
						>
							<div className="number-container">
								<h5
									style={{
										paddingTop: "1em",
									}}
								>
									YTD Revenue (for FY24)
								</h5>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderStyle: "ridge",
										height: "3em",
										width: "3em",
									}}
								>
									5
								</div>
								SGD
							</div>
							<div className="number-container">
								<h5>YTD EBITA (for FY24)</h5>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderStyle: "ridge",
										height: "3em",
										width: "3em",
									}}
								>
									5
								</div>
							</div>
							<div className="number-container">
								<h5>Net Asset Value</h5>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										borderStyle: "ridge",
										height: "3em",
										width: "3em",
									}}
								>
									5
								</div>
							</div>
						</div>
						<div style={{ margin: "3em 3em" }}>
							Last Financial Date: DDMMMYYYY
						</div>
					</div>
				</div>
				<div style={{ borderTop: "2px solid gray", margin: "2em 0" }}></div>
				<div className="each-dashboard-container">
					<h2>Dashboard</h2>
					<div
						className="numbers-container"
						style={{
							display: "flex",
							flexDirection: "row",
							width: "100%",
							justifyContent: "space-evenly",
						}}
					>
						<div className="number-container">
							<h5>Pending Action</h5>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									borderStyle: "ridge",
									height: "3em",
									width: "3em",
								}}
							>
								5
							</div>
						</div>
						<div className="number-container">
							<h5>In progress</h5>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									borderStyle: "ridge",
									height: "3em",
									width: "3em",
								}}
							>
								5
							</div>
						</div>
					</div>
					<div
						className="notifications-container"
						style={{ margin: "3em 2em", border: "ridge" }}
					>
						<h3>Compliance notifications</h3>
						{renderNotifications}
					</div>
					<div
						className="table-content"
						style={{
							marginTop: "3em",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<table border="1">
							<thead>
								<tr>
									<th>Module</th>
									<th>Ticket number</th>
									<th>Title</th>
									<th>Description</th>
									<th>Status</th>
									<th>Deadline</th>
									<th>Priority</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item) => (
									<tr key={item.ticket}>
										<td>{item.module}</td>
										<td>{item.ticketNumber}</td>
										<td>{item.title}</td>
										<td>{item.description}</td>
										<td>{item.status}</td>
										<td>{item.deadline}</td>
										<td>{item.priority}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div style={{ borderTop: "2px solid gray", margin: "2em 0" }}></div>
				<div className="each-dashboard-container">
					<h2>Requests</h2>
					<div className="request-container"></div>
					<div>
						<label>Select an option:</label>
						<select onChange={handleSelectChange} value={selectedOption}>
							<option value="">Select...</option>
							<option value="Appoint a Director">Appoint a Director</option>
							<option value="Issue Shares">Issue Shares</option>
						</select>

						<div>
							{selectedOption && (
								<div>
									<h3>
										Selected request "
										{
											document.querySelector(
												`option[value="${selectedOption}"]`
											).textContent
										}
										":
									</h3>
									{renderSelectedComponent()}
								</div>
							)}
						</div>
					</div>
				</div>
				<div style={{ borderTop: "2px solid gray", margin: "2em 0" }}></div>

				<div className="each-dashboard-container">
					<h2>Documents</h2>
					<DocumentsTable
						colNames={colNames}
						data={documentsTableData}
						searchFilter={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default AccountingPage;
