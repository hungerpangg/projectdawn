import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClientHomePage() {
	const sidebarOptions = [
		"Sequence",
		"CorpSec",
		"Accounting",
		"HRMS",
		"Insurance",
		"Legal",
	];
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const signupParam = queryParams.get("signup");

	const showToastMessage = () => {
		toast.success("Your account has been created!", {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	useEffect(() => {
		if (signupParam) {
			showToastMessage();
		}
	}, []);

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

	const data = [
		{
			module: "CorpSec",
			ticketNumber: 1,
			title: "Handle corp sec",
			description: "Some stuff",
			status: "In progress",
			deadline: new Date().toLocaleDateString(),
			priority: "red",
		},
		{
			module: "CorpSec",
			ticketNumber: 2,
			title: "Handle corp sec",
			description: "Some stuff",
			status: "In progress",
			deadline: new Date().toLocaleDateString(),
			priority: "red",
		},
		{
			module: "CorpSec",
			ticketNumber: 3,
			title: "Handle corp sec",
			description: "Some stuff",
			status: "In progress",
			deadline: new Date().toLocaleDateString(),
			priority: "red",
		},
	];

	return (
		<div>
			<ToastContainer />
			<div>
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
							<div className="number-container" style={{ paddingTop: "1em" }}>
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
				</div>
			</div>
		</div>
	);
}

export default ClientHomePage;
