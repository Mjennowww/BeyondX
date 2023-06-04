import React from "react";

function LoginLogoutButton({onClick, text}) {
    return (
        <button
            className="button__reusable login-logout-button"
            type="button"
            onClick={onClick}
        >

            {text}
        </button>
    );
}

export default LoginLogoutButton;