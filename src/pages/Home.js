import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginLogoutButton from "../components/LoginLogoutButton";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from "react";
import logo from "../assets/logo.png";
import mars from "../assets/image-mars.png"
import titan from "../assets/image-titan.png"
import moon from "../assets/image-moon.png"

function Home() {
    const [nextLaunch, setNextLaunch] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
        async function fetchNextLaunch() {
            try {
                const response = await axios.get('https://api.spacexdata.com/v4/launches/next');
                console.log(response.data);
                setNextLaunch(response.data);

                // Bereken de resterende tijd tot de volgende lancering
                if (response.data && response.data.date_local) {
                    const launchTime = new Date(response.data.date_local);
                    const currentTime = new Date();
                    const timeDifference = currentTime.getTime() - launchTime.getTime();
                    setCountdown(Math.floor(timeDifference / 1000)); // Zet de tijd om naar seconden
                }
            } catch (e) {
                console.error(e);
            }
        }

        fetchNextLaunch();
    }, []);

    useEffect(() => {
        // Start de timer als countdown beschikbaar is
        if (countdown !== null) {
            const intervalId = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            // Opruimen van de timer wanneer de component wordt geunmount
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [countdown]);

    const formatNextLaunchTime = () => {
        if (nextLaunch && nextLaunch.date_local) {
            const launchTime = new Date(nextLaunch.date_local);
            return launchTime.toLocaleString('nl-NL', {
                timeZone: 'Europe/Amsterdam',
            });
        }
        return '';
    };

    const formatCountdown = () => {
        if (countdown !== null && countdown >= 0) {
            const days = Math.floor(countdown / (24 * 60 * 60));
            const hours = Math.floor((countdown % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((countdown % (60 * 60)) / 60);
            const seconds = Math.floor(countdown % 60);

            return (
                <span>
          <span style={{ fontWeight: '700', fontSize: '26px', textTransform: 'uppercase' }}>{days}</span> <span style={{ textTransform: 'uppercase' }}>days</span>,{' '}
                    <span style={{ fontWeight: '700', fontSize: '26px', textTransform: 'uppercase' }}>{hours}</span> <span style={{ textTransform: 'uppercase' }}>hours</span>,{' '}
                    <span style={{ fontWeight: '700', fontSize: '26px', textTransform: 'uppercase' }}>{minutes}</span> <span style={{ textTransform: 'uppercase' }}>minutes</span>,{' '}
                    <span style={{ fontWeight: '700', fontSize: '26px', textTransform: 'uppercase' }}>{seconds}</span> <span style={{ textTransform: 'uppercase' }}>seconds</span>
        </span>
            );
        }
        return '';
    };

    return (
        <>
            <section id="home" className="outer-content-container">
                {isAuth ? (


                    <div className="inner-content-container">
                        <h1 style={{ textAlign: 'center', fontSize: '5em' }}>EXPLORE OUR<br />NEW HOME</h1>

                        <article className="headquarters">
                            <span style={{ textTransform: 'uppercase' }}>Next Launch:</span>&nbsp;&nbsp;
                            <div>{formatCountdown()}</div>
                        </article>

                        <div className="home-article-container">
                            <Link className="cardmoon article" to="/moon" style={{ textDecoration: 'none' }}>
                                <div className="card-header">
                                    <img className="profile-img" src={moon} alt="logo" />
                                </div>
                                <p className="cardtitle" style={{ color: '#fefefe', fontSize: '60px', textTransform: 'uppercase' }}>Moon</p>
                                <p className="cardtitle" style={{ color: '#fefefe' }}>Details -></p>
                            </Link>

                            <Link className="cardmoon article" to="/mars" style={{ textDecoration: 'none' }}>
                                <div className="card-header">
                                    <img className="profile-img" src={mars} alt="logo" />
                                </div>
                                <p className="cardtitle" style={{ color: '#fefefe', fontSize: '60px', textTransform: 'uppercase' }}>Mars</p>
                                <p style={{ color: '#fefefe' }}>Details -></p>
                            </Link>

                            <Link className="cardmoon article" to="/titan" style={{ textDecoration: 'none' }}>
                                <div className="card-header">
                                    <img className="profile-img" src={titan} alt="logo" />
                                </div>
                                <p className="cardtitle" style={{ color: '#fefefe', fontSize: '60px', textTransform: 'uppercase' }}>Titan</p>
                                <p style={{ color: '#fefefe' }}>Details -></p>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="inner-content-container">
                        <h1 style={{ textAlign: 'center', fontSize:'5em'}}>EXPLORE OUR<br />NEW HOME</h1>

                        <article className="headquarters">
                            <span style={{ textTransform: 'uppercase' }}>Next Launch:</span>&nbsp;&nbsp;
                            <div>{formatCountdown()}</div>
                        </article>

                        <LoginLogoutButton
                            className="button button1"
                            text="Get started"
                            onClick={() => navigate("/login")}
                        />
                    </div>
                )}
            </section>
        </>
    );
}

export default Home;