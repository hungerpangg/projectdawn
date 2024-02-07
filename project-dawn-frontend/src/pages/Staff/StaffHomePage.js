import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Category } from "../../enums";
import DocumentsTable from "../../components/DocumentsTable";
import { Link } from "react-router-dom";

function StaffHomePage() {
	const [corpsecTickets, setCorpsecTickets] = useState([]);
	const [accountingTickets, setAccountingTickets] = useState([]);

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

	const ticketColNames = [
		"Ticket no.",
		"Ticket type",
		"Additional info",
		"Created by",
		"Company",
	];

	const getTickets = async () => {
		try {
			const corpsec = await fetch(
				`${process.env.REACT_APP_API_URL}/tickets?category=${Category.Corpsec}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const accounting = await fetch(
				`${process.env.REACT_APP_API_URL}/tickets?category=${Category.Accounting}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const corpsecData = await corpsec.json();
			const accountingData = await accounting.json();
			setCorpsecTickets(corpsecData);
			setAccountingTickets(accountingData);
		} catch (err) {
			console.log(err);
		}
	};

	const corpsecTableData = corpsecTickets?.map((ticket) => ({
		ticketNumber: <Link to={`/staff/ticket/${ticket._id}`}>{ticket._id}</Link>,
		ticketType: ticket.type,
		addtionalInfo: ticket.payload.additionalInformationInput || "None",
		createdBy: ticket.creator?.email,
		createdAt: ticket.company?.name,
	}));

	const accountingTableData = accountingTickets?.map((ticket) => ({
		ticketNumber: <Link to={`/staff/ticket/${ticket._id}`}>{ticket._id}</Link>,
		ticketType: ticket.type,
		addtionalInfo: ticket.payload.additionalInformationInput || "None",
		createdBy: ticket.creator?.email,
		createdAt: ticket.company?.name,
	}));

	const colWidth = ["6em", "5em", "7em", "7em", "3em"];

	useEffect(() => {
		getTickets();
	}, []);

	return (
		<div>
			<div>
				<div
					className="dashboard-container"
					style={{ display: "flex", flexDirection: "column" }}
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
						<div
							className="table-content"
							style={{
								marginTop: "3em",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "column",
							}}
						>
							<h2>Tickets</h2>
							<DocumentsTable
								colNames={ticketColNames}
								data={corpsecTableData}
								searchFilter={true}
								searchName="ticket name"
								colWidth={colWidth}
							/>
						</div>
					</div>
					<div style={{ borderTop: "2px solid gray", margin: "2em 0" }}></div>
					{/* Accounting */}
					<div className="each-dashboard-container">
						<h2>Accounting</h2>
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
								<h5>YTD Revenue (for FY24)</h5>
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
							<DocumentsTable
								colNames={ticketColNames}
								data={accountingTableData}
								searchFilter={true}
								searchName="ticket name"
								colWidth={colWidth}
							/>
						</div>
					</div>
					<div style={{ borderTop: "2px solid gray", margin: "2em 0" }}></div>
					{/* HRMS  */}
					<div className="each-dashboard-container">
						<h2>HRMS</h2>
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
							<DocumentsTable
								colNames={ticketColNames}
								data={corpsecTableData}
								searchFilter={true}
								searchName="ticket name"
								colWidth={colWidth}
							/>
						</div>
					</div>
					<div style={{ borderTop: "2px solid gray", margin: "2em 0" }}></div>
				</div>
			</div>
		</div>
	);
}

export default StaffHomePage;
