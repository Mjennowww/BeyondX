import React from 'react';
import {Link} from "react-router-dom";
import Button from "../components/Button";

//Component for login and register
function Authorization({onSubmitValue, header, children, underlineTextPart1, underlineLink, underlineLinkText, underlineTextPart2, buttonText, error, loading}) {
    return (
        <div >
            <h3 >{header}</h3>
            <form onSubmit={onSubmitValue}>
                {children}
                <p >{underlineTextPart1} <Link to={underlineLink}>{underlineLinkText}</Link> {underlineTextPart2}</p>
                <Button
                    text={buttonText}
                    type="submit"
                />
                <div >{error}{loading}</div>
            </form>
        </div>
    );
}

export default Authorization;