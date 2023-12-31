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

function CorpSec() {
	const [selectedOption, setSelectedOption] = useState(null);
	const [tickets, setTickets] = useState([]);
	const [documents, setDocuments] = useState([]);
	const {
		authenticatedState: { userId, companyId },
	} = useContext(AuthenticateContext);

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const category = "corpsec";

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
		"Ticket no.",
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

	const ticketColNames = [
		"Ticket no.",
		"Ticket type",
		"Additional info",
		"Created by",
		"Created at",
	];

	const getTickets = async () => {
		try {
			const res = await fetch(
				`http://localhost:3001/tickets?category=${category}&companyId=${companyId}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const data = await res.json();
			// console.log(data, "tickets");
			setTickets(data);
		} catch (err) {
			console.log(err);
		}
	};

	const getDocuments = async () => {
		try {
			const res = await fetch(
				`http://localhost:3001/documents?category=${category}&companyId=${companyId}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const data = await res.json();
			// console.log(data);
			setDocuments(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (companyId) {
			getTickets();
			getDocuments();
		}
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
	const renderNotifications = notifications.map((notification) => {
		return <div>{notification.title}</div>;
	});

	const ticketsTableData = tickets?.map((ticket) => ({
		ticketNumber: ticket._id,
		ticketType: ticket.type,
		addtionalInfo: ticket.payload.additionalInformationInput || "None",
		createdBy: ticket.creator.name,
		createdAt: ticket.createdAt,
	}));

	const documentsTableData = documents?.map((document) => ({
		ticketNumber: document.ticket,
		name: document.name,
		uploadedBy: document.creator.name,
		uploadedAt: document.createdAt,
		link: <a href={document.url}>Link</a>,
	}));

	console.log(ticketsTableData, "ticketsTable");
	console.log(documentsTableData, "documentsTable");

	const colWidth = ["6em", "5em", "7em", "7em", "3em"];

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
					<h2>Compliance</h2>
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
					{/* <div
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
					</div> */}
					<h2>Tickets</h2>
					<DocumentsTable
						colNames={ticketColNames}
						data={ticketsTableData}
						searchFilter={true}
						searchName="ticket no."
						colWidth={colWidth}
					/>
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
					<h2>Company Info</h2>
					<div>
						<div className="uen-container">
							<h3>UEN:</h3> 12345
						</div>
						<div className="company-name-container">
							<h3>Company name:</h3> Company A
						</div>
						<div className="directors-container">
							<h3>Directors</h3>
							<div
								style={{ display: "flex", flexDirection: "row", gap: "10px" }}
							>
								<div style={{ maxWidth: "20%", flex: "1" }}>
									<img
										style={{ maxWidth: "100%" }}
										src="https://sequence-projectdawn.s3.ap-southeast-1.amazonaws.com/no-profile-picture.jpeg"
									/>
									<h4>Director A</h4>
								</div>
								<div style={{ maxWidth: "20%", flex: "1" }}>
									<img
										style={{ maxWidth: "100%" }}
										src="https://sequence-projectdawn.s3.ap-southeast-1.amazonaws.com/no-profile-picture.jpeg"
									/>
									<h4>Director B</h4>
								</div>

								<div style={{ maxWidth: "20%", flex: "1" }}>
									<img
										style={{ maxWidth: "100%" }}
										src="https://sequence-projectdawn.s3.ap-southeast-1.amazonaws.com/no-profile-picture.jpeg"
									/>
									<h4>Director C</h4>
								</div>
							</div>
						</div>
						<div className="shareholders-container">
							<h3>Shareholders</h3>
							<div
								style={{ display: "flex", flexDirection: "row", gap: "10px" }}
							>
								<div style={{ maxWidth: "20%", flex: "1" }}>
									<img
										style={{ maxWidth: "100%" }}
										src="https://sequence-projectdawn.s3.ap-southeast-1.amazonaws.com/no-profile-picture.jpeg"
									/>
									<h4>
										Shareholder A: <br></br>20%
									</h4>
								</div>
								<div style={{ maxWidth: "20%", flex: "1" }}>
									<img
										style={{ maxWidth: "100%" }}
										src="https://sequence-projectdawn.s3.ap-southeast-1.amazonaws.com/no-profile-picture.jpeg"
									/>
									<h4>
										Shareholder B: <br></br>10%
									</h4>
								</div>

								<div style={{ maxWidth: "20%", flex: "1" }}>
									<img
										style={{ maxWidth: "100%" }}
										src="https://sequence-projectdawn.s3.ap-southeast-1.amazonaws.com/no-profile-picture.jpeg"
									/>
									<h4>
										Shareholder C: <br></br>5%
									</h4>
								</div>
								<div style={{ maxWidth: "20%", flex: "1" }}>
									<img
										style={{ maxWidth: "100%" }}
										src="https://sequence-projectdawn.s3.ap-southeast-1.amazonaws.com/no-profile-picture.jpeg"
									/>
									<h4>
										Shareholder D: <br></br>5%
									</h4>
								</div>
								<div style={{ maxWidth: "20%", flex: "1" }}>
									<img
										style={{ maxWidth: "100%" }}
										src="https://sequence-projectdawn.s3.ap-southeast-1.amazonaws.com/no-profile-picture.jpeg"
									/>
									<h4>
										Shareholder E: <br></br>3%
									</h4>
								</div>
							</div>
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
						searchName="document name"
						colWidth={colWidth}
					/>
				</div>
			</div>
		</div>
	);
}

export default CorpSec;
