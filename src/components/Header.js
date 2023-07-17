import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginLogoutButton from './LoginLogoutButton';
import moonImage from '../assets/image-moon.png';
import marsImage from '../assets/image-mars.png';
import titanImage from '../assets/image-titan.png';

function Header() {
    const { isAuth, logout, user } = useContext(AuthContext);
    let username = '';

    if (user) {
        username = user.username;
    }

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState);
    };

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
                            <li className="navItem">
                                <Link to="/launches">Launches</Link>
                            </li>
                            <li className="navItem">
                                <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                                    <span className="dropdown-label">Planets ▾</span>
                                    {showDropdown && (
                                        <div className="dropdown-content">
                                            <Link to="/moon" className="planet-link">
                                                <img src={moonImage} alt="moon" className="planet-icon" width="20"/>
                                                Moon
                                            </Link>
                                            <Link to="/mars" className="planet-link">
                                                <img src={marsImage} alt="mars" className="planet-icon" width="20"/>
                                                Mars
                                            </Link>
                                            <Link to="/titan" className="planet-link">
                                                <img src={titanImage} alt="titan" className="planet-icon" width="20"/>
                                                Titan
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li className="navItem">
                                <p>Welcome {username}</p>
                            </li>
                            <li>
                                <LoginLogoutButton className="button button3" text="logout" onClick={logout} />
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
