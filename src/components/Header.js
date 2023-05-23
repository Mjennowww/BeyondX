import React, {useContext} from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <header id="header" className="outer-content-container">
            <div className="inner-content-container-header">
                <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo" width="250"/>
          </span>
                </Link>

            <nav className="header-navigation">
                <ul>
                    <li>
                        <Link to="/capsules" className="navItem" >Capsules</Link>
                    </li>
                    <li>
                        <Link to="/capsules" className="navItem" >Capsules</Link>
                    </li>
                    <li>
                        <Link to="/capsules" className="navItem" >Capsules</Link>
                    </li>
                    <li>
                        <Link to="/capsules" className="navItem" >Register</Link>
                    </li>
                    <li>
                        <Link to="/capsules" className="navItem" >Capsules</Link>
                    </li>


                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Header;