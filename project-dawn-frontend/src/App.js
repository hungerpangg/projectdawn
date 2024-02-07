import { useState, useContext } from "react";
import IncorporateWithUsPage from "./pages/IncorporateWithUsPage";
import ClientFrontPage from "./pages/ClientFrontPage";
import TransferToUsPage from "./pages/TransferToUsPage";
import ClientHomePage from "./pages/ClientHomePage";
import StaffHomePage from "./pages/Staff/StaffHomePage";
import CorpSecPage from "./pages/CorpSecPage";
import AccountingPage from "./pages/AccountingPage";
import ClientLogInPage from "./pages/ClientLogInPage";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import StaffFrontPage from "./pages/Staff/StaffFrontPage";
import StaffLogInPage from "./pages/Staff/StaffLogInPage";
import StaffViewTicket from "./pages/Staff/StaffViewTicket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticateContext from "./context/authentication";
import ClientViewTicket from "./pages/ClientViewTicket";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	const {
		authenticatedState: { isAuthenticated, userType },
	} = useContext(AuthenticateContext);

	const path = window.location.pathname.substring(1);
	console.log(path, "path");

	const [activeTab, setActiveTab] = useState("");

	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
		console.log(tabName, "tab");
	};

	const staffPages = ["staff", "staff/login", "staff/home", "staff/ticket"];

	const clientPages = [
		"incorporate",
		"transfer",
		"login",
		"home",
		"corpsec",
		"accounting",
	];

	const clientSidebarOptionList = [
		"Sequence",
		"CorpSec",
		"Accounting",
		"HRMS",
		"Insurance",
		"Legal",
	];

	const clientTopbarOptionList = [
		"Billing & Subscription",
		"Activity Log",
		"Mailbox",
		"User Management",
		"Support",
		"Profile",
	];

	const StaffSidebarOptionList = [
		"Sequence",
		"CorpSec",
		"Accounting",
		"HRMS",
		"Insurance",
		"Legal",
		"IT/Product",
		"Admin",
	];

	const StaffTopbarOptionList = [
		"Staff",
		"Activity Log",
		"Mailbox",
		"User Management",
		"24/7 Support",
		"Profile",
	];

	return (
		<div>
			<Router>
				{isAuthenticated &&
					userType === "client" &&
					!staffPages.includes(path) && (
						<Sidebar
							optionList={clientSidebarOptionList}
							activeTab={activeTab}
							handleTabClick={handleTabClick}
						/>
					)}
				{isAuthenticated &&
					userType === "client" &&
					!staffPages.includes(path) && (
						<Topbar
							optionList={clientTopbarOptionList}
							activeTab={activeTab}
							handleTabClick={handleTabClick}
						/>
					)}
				{isAuthenticated &&
					userType === "staff" &&
					!clientPages.includes(path) &&
					path !== "" && (
						<Sidebar
							optionList={StaffSidebarOptionList}
							activeTab={activeTab}
							handleTabClick={handleTabClick}
						/>
					)}
				{isAuthenticated &&
					userType === "staff" &&
					!clientPages.includes(path) &&
					path !== "" && (
						<Topbar
							optionList={StaffTopbarOptionList}
							activeTab={activeTab}
							handleTabClick={handleTabClick}
						/>
					)}

				<Routes>
					{/* <Route path="/" element={<ClientFrontPage />} /> */}
					<Route
						path="/"
						element={
							<PrivateRoute
								element={<ClientHomePage />}
								alternateElement={<ClientFrontPage />}
								isAuthenticated={isAuthenticated && userType === "client"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/incorporate" element={<IncorporateWithUsPage />} /> */}
					<Route
						path="/incorporate"
						element={
							<PrivateRoute
								element={<ClientHomePage />}
								alternateElement={<IncorporateWithUsPage />}
								isAuthenticated={isAuthenticated && userType === "client"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/transfer" element={<TransferToUsPage />} /> */}
					<Route
						path="/transfer"
						element={
							<PrivateRoute
								element={<ClientHomePage />}
								alternateElement={<TransferToUsPage />}
								isAuthenticated={isAuthenticated && userType === "client"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/home" element={<ClientHomePage />} /> */}
					<Route
						path="/home"
						element={
							<PrivateRoute
								element={<ClientHomePage />}
								alternateElement={<ClientLogInPage redirect={true} />}
								isAuthenticated={isAuthenticated && userType === "client"}
							/>
						}
					/>
				</Routes>

				<Routes>
					{/* <Route path="/corpsec" element={<CorpSecPage />} /> */}
					<Route
						path="/corpsec"
						element={
							<PrivateRoute
								element={<CorpSecPage />}
								alternateElement={<ClientLogInPage redirect={true} />}
								isAuthenticated={isAuthenticated && userType === "client"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/accounting" element={<AccountingPage />} /> */}
					<Route
						path="/accounting"
						element={
							<PrivateRoute
								element={<ClientHomePage />}
								alternateElement={<ClientLogInPage redirect={true} />}
								isAuthenticated={isAuthenticated && userType === "client"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/login" element={<ClientLogInPage />} /> */}
					<Route
						path="/login"
						element={
							<PrivateRoute
								element={<ClientHomePage />}
								alternateElement={<ClientLogInPage />}
								isAuthenticated={isAuthenticated && userType === "client"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/ticket/:ticketId" element={<ClientViewTicket />} /> */}
					<Route
						path="/ticket/:ticketId"
						element={
							<PrivateRoute
								element={<ClientViewTicket />}
								alternateElement={<ClientLogInPage redirect={true} />}
								isAuthenticated={isAuthenticated && userType === "client"}
							/>
						}
					/>
				</Routes>

				{/* For staff  */}
				<Routes>
					{/* <Route path="/staff" element={<StaffFrontPage />} /> */}
					<Route
						path="/staff"
						element={
							<PrivateRoute
								element={<StaffHomePage />}
								alternateElement={<StaffFrontPage />}
								isAuthenticated={isAuthenticated && userType === "staff"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/staff/home" element={<StaffHomePage />} /> */}
					<Route
						path="/staff/home"
						element={
							<PrivateRoute
								element={<StaffHomePage />}
								alternateElement={<StaffLogInPage redirect={true} />}
								isAuthenticated={isAuthenticated && userType === "staff"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/staff/login" element={<StaffLogInPage />} /> */}
					<Route
						path="/staff/login"
						element={
							<PrivateRoute
								element={<StaffHomePage />}
								alternateElement={<StaffLogInPage />}
								isAuthenticated={isAuthenticated && userType === "staff"}
							/>
						}
					/>
				</Routes>
				<Routes>
					{/* <Route path="/staff/ticket/:ticketId" element={<StaffViewTicket />} /> */}
					<Route
						path="/staff/ticket/:ticketId"
						element={
							<PrivateRoute
								element={<StaffViewTicket />}
								alternateElement={<StaffLogInPage redirect={true} />}
								isAuthenticated={isAuthenticated && userType === "staff"}
							/>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
