import React from 'react';
import {Link} from "react-router-dom";
import Button from "../components/Button";

//Component for login and register
function Authorization({onSubmitValue, header, children, underlineTextPart1, underlineLink, underlineLinkText, underlineTextPart2, buttonText, error, loading}) {
    return (
        <div >
            <section id="home" className="outer-content-container">
                <div className="inner-content-container">
                    <div className="login">
            <h3 >{header}</h3>
            <form onSubmit={onSubmitValue}>
                {children}
                <p >{underlineTextPart1} <Link to={underlineLink} style={{color: 'white', textDecoration: 'underline'}}>{underlineLinkText}</Link> {underlineTextPart2}</p>
                <Button
                    text={buttonText}
                    type="submit"
                    className="button button1"
                />
                <div >{error}{loading}</div>
            </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Authorization;