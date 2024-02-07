import { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ optionList, activeTab, handleTabClick, staff }) {
	const [nameList, setNameList] = useState([]);
	// const [activeTab, setActiveTab] = useState("");
	const location = useLocation();
	// const firstPath = location.pathname.split("/")[1];

	// activeTab = decodeURIComponent(firstPath) || "";

	const clientOptionList = [
		"Sequence",
		"CorpSec",
		"Accounting",
		"HRMS",
		"Insurance",
		"Legal",
	];

	// const handleTabClick = (tabName) => {
	// 	setActiveTab(tabName);
	// 	console.log(tabName, "tab");
	// };

	useEffect(() => {
		if (optionList?.length < 1 || !optionList) {
			setNameList(clientOptionList);
		} else {
			setNameList(optionList);
		}
	}, [activeTab]);

	useEffect(() => {
		if (location.pathname === "/home") handleTabClick("Sequence");
		else handleTabClick(location.pathname.substring(1));
	}, []);

	const options = nameList?.map((option) => {
		return (
			// <div className="sidebar-options">
			// 	{option !== "Sequence" ? <p>{option}</p> : <h3>{option}</h3>}
			// </div>
			<NavLink
				to={
					option.toLowerCase() === "sequence"
						? staff
							? "/staff/home"
							: "/home"
						: staff
						? `/staff/${option}`
						: `/${option}`
				}
				// to={`/${option}`}
				// className="sidebar-options"
				className={`sidebar-options ${
					activeTab === option ? "active-custom" : ""
				}`}
				style={{ color: "inherit", textDecoration: "none" }}
				onClick={() => handleTabClick(option)}
			>
				<p>{option}</p>
				{/* {option.toLowerCase() !== "sequence" ? (
					<p>{option}</p>
				) : (
					<h3>{option}</h3>
				)} */}
			</NavLink>
		);
	});

	return (
		<div
			className="sidebar"
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			{options}
		</div>
	);
}

export default Sidebar;
