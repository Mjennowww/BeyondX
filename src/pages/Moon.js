import React, { useState, useEffect } from 'react';
import moon from "../assets/image-moon.png";
import { Link } from 'react-router-dom';

function Moon() {
    const [moonData, setMoonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isFahrenheit, setIsFahrenheit] = useState(false);

    useEffect(() => {
        const fetchMoonData = async () => {
            setLoading(true);
            setError(false);

            try {
                const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/moon');
                const data = await response.json();
                setMoonData(data);
            } catch (error) {
                console.error('Error fetching moon data:', error);
                setError(true);
            }

            setLoading(false);
        };

        fetchMoonData();
    }, []);

    const toggleTemperatureUnit = () => {
        setIsFahrenheit(prevState => !prevState);
    };

    const convertToFahrenheit = celsius => {
        return (celsius * 9) / 5 + 32;
    };

    const formatOrbitalPeriod = value => {
        return value.toString().replace('.', ',');
    };

    return (
        <>
            <section id="planetmoon" className="outer-content-container">
                <div className="inner-content-container">
                    <div className="planets-article-container">
                        <Link to="/" style={{color:'#fefefe',textDecoration:'none'}}>
                        <p>{'<- Go back'}</p>
                        </Link>
                        <img src={moon} alt="logo" />

                        <div style={{paddingLeft:'40px'}}>
                            <h2 className="cardtitle" style={{ color: '#fefefe', fontSize: '60px', textTransform: 'uppercase' }}>Moon</h2>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error fetching moon data...</p>}
                            {moonData && (
                                <>
                                    <p style={{ color: '#fefefe', fontSize: '14px'}}>Name: {moonData.name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Discovered By: {moonData.discoveredBy}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Discovery Date: {moonData.discoveryDate}</p>
                                    <p style={{ paddingTop:'16px'}}>Gravity: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{moonData.gravity} m/s²</span></p>
                                    <p>Avg temperature at night: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{isFahrenheit ? convertToFahrenheit(-183) : -183}°{isFahrenheit ? 'F' : 'C'}</span></p>
                                    <p>Avg temperature at day: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{isFahrenheit ? convertToFahrenheit(106) : 106}°{isFahrenheit ? 'F' : 'C'}</span></p>
                                    <p>Orbital Period: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{formatOrbitalPeriod(moonData.sideralOrbit)} days</span></p>
                                    <p>Equatorial Radius: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{moonData.equaRadius} km</span></p>
                                    <p>Polar Radius: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{moonData.polarRadius} km</span></p>
                                    <p>Mass: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{moonData.mass.massValue} × 10^{moonData.mass.massExponent} kg</span></p>
                                    <p style={{ paddingBottom:'24px'}}>Density: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{moonData.density} g/cm³</span></p>



                                    <button onClick={toggleTemperatureUnit} className="button button3">
                                        Switch to {isFahrenheit ? 'Celsius' : 'Fahrenheit'}
                                    </button>


                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Moon;
