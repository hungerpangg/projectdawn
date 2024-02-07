import { Link, NavLink } from "react-router-dom";

function StaffFrontPage() {
	return (
		<div>
			<div class="home-buttons">
				<div>
					<button>
						<Link to="/staff/login">Log in</Link>
					</button>
				</div>
			</div>
		</div>
	);
}

export default StaffFrontPage;
