import { useState, useContext } from "react";
import IncorporateWithUsPage from "./pages/IncorporateWithUsPage";
import ClientFrontPage from "./pages/ClientFrontPage";
import TransferToUsPage from "./pages/TransferToUsPage";
import ClientHomePage from "./pages/ClientHomePage";
import StaffHomePage from "./pages/StaffHomePage";
import CorpSecPage from "./pages/CorpSecPage";
import AccountingPage from "./pages/AccountingPage";
import ClientLogInPage from "./pages/ClientLogInPage";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticateContext from "./context/authentication";

function App() {
	const {
		authenticatedState: { isAuthenticated },
	} = useContext(AuthenticateContext);

	const [activeTab, setActiveTab] = useState("");

	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
		console.log(tabName, "tab");
	};

	return (
		<div>
			<Router>
				{isAuthenticated && (
					<Sidebar activeTab={activeTab} handleTabClick={handleTabClick} />
				)}
				{isAuthenticated && (
					<Topbar activeTab={activeTab} handleTabClick={handleTabClick} />
				)}
				<Routes>
					<Route path="/" element={<ClientFrontPage />} />
				</Routes>
				<Routes>
					<Route path="/incorporate" element={<IncorporateWithUsPage />} />
				</Routes>
				<Routes>
					<Route path="/transfer" element={<TransferToUsPage />} />
				</Routes>
				<Routes>
					<Route path="/home" element={<ClientHomePage />} />
				</Routes>
				<Routes>
					<Route path="/staff" element={<StaffHomePage />} />
				</Routes>
				<Routes>
					<Route path="/corpsec" element={<CorpSecPage />} />
				</Routes>
				<Routes>
					<Route path="/accounting" element={<AccountingPage />} />
				</Routes>
				<Routes>
					<Route path="/login" element={<ClientLogInPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
