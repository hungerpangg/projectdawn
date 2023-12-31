import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SignoutModal from "./SignoutModal";

function Topbar({ optionList, activeTab, handleTabClick }) {
	const [nameList, setNameList] = useState([]);
	const [isDropdownVisible, setDropdownVisibility] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);
	const { pathname } = useLocation();

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const toggleProfileDropdown = () => {
		setDropdownVisibility(!isDropdownVisible);
	};

	const hideDropdown = () => {
		setDropdownVisibility(false);
	};

	const clientOptionList = [
		"Billing & Subscription",
		"Activity Log",
		"Mailbox",
		"User Management",
		"24/7 Support",
		"Profile",
	];

	const optionListLinks = [
		"billing & subscription",
		"activity log",
		"mail box",
	];

	useEffect(() => {
		if (optionList?.length < 1 || !optionList) {
			setNameList(clientOptionList);
		} else {
			setNameList(optionList);
		}
	}, []);

	console.log(nameList, "namelist");

	const profileMenuBar = (
		<div className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}>
			<NavLink className="top-dropdownbar-options" to="/profile">
				My profile
			</NavLink>
			<NavLink
				className="top-dropdownbar-options"
				style={{ border: "none" }}
				to="/profile"
				onClick={openModal}
			>
				Sign out
			</NavLink>
		</div>
	);

	console.log(activeTab, "activetab");

	const options = nameList?.map((option) => {
		return (
			<NavLink
				to={option.toLowerCase() === "profile" ? pathname : `/${option}`}
				className={`topbar-options ${
					activeTab === option ? "active-custom" : ""
				}`}
				style={{ color: "inherit", textDecoration: "none" }}
				onClick={(e) => {
					if (option === "/Profile") e.preventDefault();
					if (option.toLowerCase() !== "profile") handleTabClick(option);
					if (option.toLowerCase() === "profile") toggleProfileDropdown();
				}}
			>
				<p>{option}</p>
			</NavLink>
		);
	});

	return (
		<div
			className="topbar"
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-evenly",
				alignItems: "stretch",
			}}
		>
			<SignoutModal isOpen={isModalOpen} onClose={closeModal} />
			{options}
			{profileMenuBar}
		</div>
	);
}

export default Topbar;
