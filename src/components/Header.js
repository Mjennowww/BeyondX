import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginLogoutButton  from "./LoginLogoutButton";

function Header() {
    const { isAuth, logout, username } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <header id="header" className="outer-content-container">
                <div className="inner-content-container-header">
                    <Link to="/">
                        <span className="logo-container">
                            <img src={logo} alt="logo" width="250" />
                        </span>
                    </Link>

                    <nav className="header-navigation">
                        <ul>
                            {isAuth && (
                                <>
                                    <li>
                                        <Link to="/capsules" className="navItem">Capsules 1</Link>
                                    </li>
                                    <li>
                                        <Link to="/capsules" className="navItem">Capsules 2</Link>
                                    </li>
                                    <li>
                                        <Link to="/capsules" className="navItem">Capsules 3</Link>
                                    </li>
                                </>
                            )}
                            <li className="navigation__list-items">
                                {isAuth ?
                                    <LoginLogoutButton
                                        text="logout"
                                        onClick={logout}
                                    />
                                    :
                                    <LoginLogoutButton
                                        text="login"
                                        onClick={() => navigate("/login")}
                                    />
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;