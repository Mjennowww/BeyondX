import React, {useContext, useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Authorization from "../components/Authorization";
import {AuthContext} from "../context/AuthContext";

//Page for registering a user
function Signup() {
    const {endpoint} = useContext((AuthContext));
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});

    function submitRegister(data) {
        makeRegisterRequest(data)
        navigate("/login");
    }

    //Function for registering an account on the Novi educational backend
    async function makeRegisterRequest(data) {
        toggleError(false);
        toggleLoading(true);
        try {
            await axios.post(`${endpoint}api/auth/signup`, {
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "role": ["user"],
            });
        } catch (e) {
            console.error(e)
            toggleError(true)
        }
        toggleLoading(false);
    }

    return (
        <div >
            <main>
                <Authorization
                    onSubmitValue={handleSubmit(submitRegister)}
                    header="Register"
                    underlineTextPart1="Do you already have a account at BeyondX? "
                    underlineLink="/login"
                    underlineLinkText="Login here"
                    buttonText="Register"
                    error={error && <span>This account already exist, please register with different credentials</span>}
                    loading={loading && <span>Registering your account, please wait...</span>}
                >

                    <label  htmlFor="email">
                        <span style={{fontSize:'14px'}}>E-MAIL</span>
                        <input

                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email cannot be empty",
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "Email address is not valid",
                                }
                            })}
                        />
                        {errors.email && <p >{errors.email.message}</p>}
                    </label>
                    <label  htmlFor="username">
                        <span style={{fontSize:'14px'}}>USERNAME</span>
                        <input

                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "Username cannot be empty",
                                minLength: {
                                    value: 6,
                                    message: "Use at least 6 characters for the username",
                                }
                            })}
                        />
                        {errors.username && <p className="authorization__error">{errors.username.message}</p>}
                    </label>
                    <label htmlFor="password">
                        <span style={{fontSize:'14px'}}>PASSWORD</span>
                        <input

                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password cannot be empty",
                                minLength: {
                                    value: 6,
                                    message: "Use at least 6 characters for the password",
                                }
                            })}
                        />
                        {errors.password && <p className="authorization__error">{errors.password.message}</p>}
                    </label>
                </Authorization>
            </main>
        </div>
    );
}

export default Signup;