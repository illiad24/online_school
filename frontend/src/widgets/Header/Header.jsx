
import { Link } from "react-router";
import { UserInfo } from "./UserInfo";

function Header() {

    return (
        <header>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/users">Users</Link></li>
                    </ul>
                </nav>
                <UserInfo />

            </div>
        </header>
    );
}

export default Header;