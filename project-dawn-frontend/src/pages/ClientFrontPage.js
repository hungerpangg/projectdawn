import { Link, NavLink } from "react-router-dom";

function Home() {
	return (
		<div>
			<div class="home-buttons">
				<div>
					<button>
						<Link to="/incorporate">Incorporate with us</Link>
					</button>
				</div>
				<div>
					<button>
						<Link to="/transfer">Transfer to us</Link>
					</button>
				</div>
				<div>
					<button>
						<Link to="/login">Log in</Link>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
