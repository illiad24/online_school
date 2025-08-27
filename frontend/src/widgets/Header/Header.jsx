
import { Link } from "react-router";
import { UserInfo } from "./UserInfo";
import { MainMenu } from "./MainMenu";

function Header() {

    return (
        <header className="header">
            <div className="header__container container">
                <div className="header__logo">
                    VT
                </div>
                <div className="header__body">
                    <MainMenu />
                    <UserInfo />
                </div>
            </div>
        </header>
    );
}

export default Header;