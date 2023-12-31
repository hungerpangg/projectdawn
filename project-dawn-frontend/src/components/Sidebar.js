import { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ optionList, activeTab, handleTabClick }) {
	const [nameList, setNameList] = useState([]);
	// const [activeTab, setActiveTab] = useState("");
	const { pathname } = useLocation();

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
		if (pathname.substr(0, 4) === "home") handleTabClick("Sequence");
	});

	const options = nameList?.map((option) => {
		return (
			// <div className="sidebar-options">
			// 	{option !== "Sequence" ? <p>{option}</p> : <h3>{option}</h3>}
			// </div>
			<NavLink
				to={option.toLowerCase() === "sequence" ? "/home" : `/${option}`}
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
