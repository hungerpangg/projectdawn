// import { useState, useContext } from "react";
// import IncorporateWithUsPage from "./pages/IncorporateWithUsPage";
// import ClientFrontPage from "./pages/ClientFrontPage";
// import TransferToUsPage from "./pages/TransferToUsPage";
// import ClientHomePage from "./pages/ClientHomePage";
// import StaffHomePage from "./pages/Staff/StaffHomePage";
// import CorpSecPage from "./pages/CorpSecPage";
// import AccountingPage from "./pages/AccountingPage";
// import ClientLogInPage from "./pages/ClientLogInPage";
// import Topbar from "./components/Topbar";
// import Sidebar from "./components/Sidebar";
// import StaffFrontPage from "./pages/Staff/StaffFrontPage";
// import StaffLogInPage from "./pages/Staff/StaffLogInPage";
// import StaffViewTicket from "./pages/Staff/StaffViewTicket";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AuthenticateContext from "./context/authentication";
// import ClientViewTicket from "./pages/ClientViewTicket";
// import PrivateRoute from "./components/PrivateRoute";

// function App() {
// 	const {
// 		authenticatedState: { isAuthenticated, userType },
// 	} = useContext(AuthenticateContext);

// 	const [activeTab, setActiveTab] = useState("");

// 	const handleTabClick = (tabName) => {
// 		setActiveTab(tabName);
// 		console.log(tabName, "tab");
// 	};

// 	const clientSidebarOptionList = [
// 		"Sequence",
// 		"CorpSec",
// 		"Accounting",
// 		"HRMS",
// 		"Insurance",
// 		"Legal",
// 	];

// 	const clientTopbarOptionList = [
// 		"Billing & Subscription",
// 		"Activity Log",
// 		"Mailbox",
// 		"User Management",
// 		"Support",
// 		"Profile",
// 	];

// 	const StaffSidebarOptionList = [
// 		"Sequence",
// 		"CorpSec",
// 		"Accounting",
// 		"HRMS",
// 		"Insurance",
// 		"Legal",
// 		"IT/Product",
// 		"Admin",
// 	];

// 	const StaffTopbarOptionList = [
// 		"Staff",
// 		"Activity Log",
// 		"Mailbox",
// 		"User Management",
// 		"24/7 Support",
// 		"Profile",
// 	];

// 	return (
// 		<div>
// 				{isAuthenticated && userType === 'client' (
// 					<Sidebar
// 						optionList={clientSidebarOptionList}
// 						activeTab={activeTab}
// 						handleTabClick={handleTabClick}
// 					/>
// 				)}
// 				{isAuthenticated && userType === 'client' (
// 					<Topbar
// 						optionList={clientSidebarOptionList}
// 						activeTab={activeTab}
// 						handleTabClick={handleTabClick}
// 					/>
// 				)}

// 				<Routes>
// 					{/* <Route path="/" element={<ClientFrontPage />} /> */}
// 					<Route
// 						path="/"
// 						element={
// 							<PrivateRoute
// 								element={<ClientHomePage />}
// 								alternateElement={<ClientFrontPage />}
// 								isAuthenticated={isAuthenticated && userType === "client"}
// 							/>
// 						}
// 					/>
// 				</Routes>
// 				<Routes>
// 					<Route path="/incorporate" element={<IncorporateWithUsPage />} />
// 				</Routes>
// 				<Routes>
// 					<Route path="/transfer" element={<TransferToUsPage />} />
// 				</Routes>
// 				<Routes>
// 					{/* <Route path="/home" element={<ClientHomePage />} /> */}
// 					<Route
// 						path="/home"
// 						element={
// 							<PrivateRoute
// 								element={<ClientHomePage />}
// 								alternateElement={<ClientLogInPage redirect={true} />}
// 								isAuthenticated={isAuthenticated}
// 							/>
// 						}
// 					/>
// 				</Routes>

// 				<Routes>
// 					{/* <Route path="/corpsec" element={<CorpSecPage />} /> */}
// 					<Route
// 						path="/corpsec"
// 						element={
// 							<PrivateRoute
// 								element={<CorpSecPage />}
// 								alternateElement={<ClientLogInPage redirect={true} />}
// 								isAuthenticated={isAuthenticated}
// 							/>
// 						}
// 					/>
// 				</Routes>
// 				<Routes>
// 					{/* <Route path="/accounting" element={<AccountingPage />} /> */}
// 					<Route
// 						path="/accounting"
// 						element={
// 							<PrivateRoute
// 								element={<ClientHomePage />}
// 								alternateElement={<ClientLogInPage redirect={true} />}
// 								isAuthenticated={isAuthenticated}
// 							/>
// 						}
// 					/>
// 				</Routes>
// 				<Routes>
// 					{/* <Route path="/login" element={<ClientLogInPage />} /> */}
// 					<Route
// 						path="/login"
// 						element={
// 							<PrivateRoute
// 								element={<ClientHomePage />}
// 								alternateElement={<ClientLogInPage />}
// 								isAuthenticated={isAuthenticated}
// 							/>
// 						}
// 					/>
// 				</Routes>
// 				<Routes>
// 					{/* <Route path="/ticket/:ticketId" element={<ClientViewTicket />} /> */}
// 					<Route
// 						path="/ticket/:ticketId"
// 						element={
// 							<PrivateRoute
// 								element={<ClientViewTicket />}
// 								alternateElement={<ClientLogInPage redirect={true} />}
// 								isAuthenticated={isAuthenticated}
// 							/>
// 						}
// 					/>
// 				</Routes>

// 		</div>
// 	);
// }

// export default App;
