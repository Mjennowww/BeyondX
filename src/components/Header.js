import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginLogoutButton from './LoginLogoutButton';

function Header() {
    const { isAuth, logout, user } = useContext(AuthContext);
    let username = '';

    if (user) {
        username = user.username;
    }

    return (
        <header id="header" className="outer-content-container">
            {isAuth ? (
                <div className="inner-content-container-headerauth">
                    <Link to="/">
                        <span className="logo-container">
                            <img src={logo} alt="logo" width="250" />
                        </span>
                    </Link>

                    <nav className="header-navigation">
                        <ul>
                            <li className="navItem" >
                                <Link to="/launches">Launches</Link>
                            </li>
                            <li className="navItem" >
                                <Link to="/rockets" >Rockets</Link>
                            </li>
                            <li className="navItem">
                                <p >Welcome {username}</p>
                            </li>
                            <li>
                                <LoginLogoutButton
                                    className="button button3"
                                    text="logout"
                                    onClick={logout}
                                />
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : (
                <div className="inner-content-container-header">
                    <Link to="/">
                        <span>
                            <img src={logo} alt="logo" width="250" />
                        </span>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
