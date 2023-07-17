import React, {useContext, useState} from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";

import Authorization from "../components/Authorization";
import {AuthContext} from "../context/AuthContext";

function Login() {
    const {login, endpoint} = useContext(AuthContext);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});

    //Function that will handle the login request
    async function makeLoginRequest(data) {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.post(`${endpoint}api/auth/signin`, {
                "username": data.username,
                "password": data.password,
            })
            login(response.data.accessToken);
        } catch (e) {
            console.error(e)
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div >

            <main >

                <Authorization
                    onSubmitValue={handleSubmit(makeLoginRequest)}
                    header="Login"
                    underlineTextPart1="New to Beyond?"
                    underlineLink="/signup"
                    underlineLinkText="Register here"
                    underlineTextPart2="your account"
                    buttonText="login"
                    error={error && <span>Username/password invalid, try again or register a new account</span>}
                    loading={loading && <span>Logging in to your account, please wait...</span>}
                >
                    <label  htmlFor="username">
                        <span style={{fontSize:'14px'}}>USERNAME</span><br />
                        <input

                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "Username cannot be empty",
                            })}
                        />
                        {errors.username && <p className="authorization__error">{errors.username.message}</p>}
                    </label>
                    <br />
                    <label  htmlFor="password">
                        <span style={{fontSize:'14px'}}>PASSWORD</span><br />
                        <input

                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password cannot be empty",
                            })}
                        />
                        {errors.password && <p className="authorization__error">{errors.password.message}</p>}
                    </label>
                </Authorization>
            </main>
        </div>
    );
}

export default Login;