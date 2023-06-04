import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(false);

// Context voor het afhandelen van de autorisatie in de hele applicatie (registreren en inloggen)
function AuthContextProvider({ children }) {
    const endpoint = "https://frontend-educational-backend.herokuapp.com/";

    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    const history = useNavigate();

    // Functie om te controleren of er een token in de lokale opslag aanwezig is en of deze verlopen is of niet
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token != null) {
            const decodedToken = jwt_decode(token);

            if (decodedToken.exp > new Date() / 1000) {
                // Functie om gebruikersgegevens op te halen wanneer de token niet is verlopen
                async function getUserData() {
                    try {
                        const response = await axios.get(`${endpoint}api/user`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        toggleAuth({
                            isAuth: true,
                            user: {
                                email: response.data.email,
                                username: response.data.username,
                                id: response.data.id,
                            },
                            status: "done",
                        });
                    } catch (e) {
                        toggleAuth({
                            ...auth,
                            status: "error",
                        });
                        console.error(e);
                        localStorage.clear();
                    }
                }

                getUserData();
            } else {
                toggleAuth({
                    ...auth,
                    status: "done",
                });
            }
        } else {
            toggleAuth({
                ...auth,
                status: "done",
            });
        }
    }, []);

    // Functie om in te loggen op My Color Palette
    function login(token) {
        const decodedToken = jwt_decode(token);
        localStorage.setItem("token", token);

        toggleAuth({
            ...auth,
            isAuth: true,
            user: {
                id: decodedToken.sub,
            },
            status: "done",
        });

        history("/");
    }

    // Functie om uit te loggen van My Color Palette
    function logout() {
        toggleAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        history("/");
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        endpoint: endpoint,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" && children}
            {auth.status === "pending" && <p>Loading the app...</p>}
            {auth.status === "error" && <p>Something went wrong, please refresh the page</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;