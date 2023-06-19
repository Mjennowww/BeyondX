import React from "react";

function LoginLogoutButton({ className, onClick, text }) {
    return (
        <button
            className={className}
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default LoginLogoutButton;