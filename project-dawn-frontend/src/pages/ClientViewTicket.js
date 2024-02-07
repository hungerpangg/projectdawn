import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";
import Spinner from "../utilities/Spinner";
import { Fields, Type } from "../enums";
import DocumentsTable from "../components/DocumentsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpZA,
	faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

function StaffViewTicket() {
	const [ticket, setTicket] = useState();
	const [documents, setDocuments] = useState();
	const { ticketId } = useParams();

	const getTickets = async () => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/tickets?ticketId=${ticketId}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			const data = await res.json();
			console.log(data, "data");
			setTicket(data[0]);
		} catch (err) {
			console.log(err);
		}
	};

	const getDocuments = async () => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/documents?ticketId=${ticketId}`,
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
		getTickets();
		getDocuments();
	}, [ticketId]);

	const documentsTableData = documents?.map((document) => ({
		ticketNumber: document.ticket,
		name: document.name,
		uploadedBy: document.creator.name,
		uploadedAt: document.createdAt,
		link: <a href={document.url}>Link</a>,
	}));

	const documentsColNames = [
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

	console.log(documents, "documents");

	if (!ticket) {
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
					<b>Fetching ticket...</b>
				</div>
				<Spinner size="8x" spinning={true} />
			</div>
		);
	}

	console.log("should not print");

	return (
		<div className="dashboard-container">
			<div className="each-dashboard-container">
				<div
					className="ticket-container"
					style={{ border: "1px solid grey", padding: "10px" }}
				>
					<h3>Ticket Information</h3>
					<hr></hr>
					<div className="ticket-list">
						<div className="ticket-field">
							<b>Company:</b> {ticket?.company?.name}
						</div>
						<div className="ticket-field">
							<b>Ticket no:</b> {ticket?._id}
						</div>
						<div className="ticket-field">
							<b>Creator:</b> {ticket?.creator?.name}
						</div>
						<div className="ticket-field">
							<b>Created at:</b> {ticket?.createdAt.substr(0, 10) || ""}
						</div>
						<div className="ticket-field">
							<b>Email:</b> {ticket?.creator?.email}
						</div>
						<div className="ticket-field">
							<b>Category:</b> {ticket?.category}
						</div>
						<div className="ticket-field">
							<b>Type:</b> {ticket?.type}
						</div>
						{Object.entries(ticket?.payload).map(([key, value]) => {
							if (key !== Fields.documentsIds)
								return (
									<div className="ticket-field">
										<b>{`${Fields[key]}:`}</b> {value}
									</div>
								);
						})}
					</div>
				</div>
				<div
					className="ticket-container"
					style={{ border: "1px solid grey", padding: "10px" }}
				>
					<h4>Documents</h4>
					<DocumentsTable
						colNames={documentsColNames}
						data={documentsTableData}
						// searchFilter={true}
						// colWidth={colWidth}
					/>
				</div>
			</div>
		</div>
	);
}

export default StaffViewTicket;
