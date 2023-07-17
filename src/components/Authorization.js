import React from 'react';
import {Link} from "react-router-dom";
import Button from "../components/Button";

//Component for login and register
function Authorization({onSubmitValue, header, children, underlineTextPart1, underlineLink, underlineLinkText, underlineTextPart2, buttonText, error, loading}) {
    return (
        <div >
            <section id="home" className="outer-content-container">
                <div className="inner-content-container">
                    <div className="logincontainer">
                    <div className="login">
            <h3 style={{textTransform:'uppercase', textAlign:'center'}}>{header}</h3>
                        <p style={{textTransform:'uppercase',fontWeight:'700', fontSize:'18px', paddingBottom:'24px'}} >{underlineTextPart1} <Link to={underlineLink} style={{color: 'orange', textDecoration: 'underline'}}>{underlineLinkText}</Link> {underlineTextPart2}</p>

                        <form onSubmit={onSubmitValue}>
                {children}
                <Button
                    text={buttonText}
                    type="submit"
                    className="buttonlogin button1"
                />
                <div >{error}{loading}</div>
            </form>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}

export default Authorization;