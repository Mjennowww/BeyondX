import React, { useState, useEffect } from 'react';
import mars from "../assets/image-mars.png";
import { Link } from 'react-router-dom';

function Mars() {
    const [marsData, setMarsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isFahrenheit, setIsFahrenheit] = useState(false);

    useEffect(() => {
        const fetchMarsData = async () => {
            setLoading(true);
            setError(false);

            try {
                const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/mars');
                const data = await response.json();
                setMarsData(data);
            } catch (error) {
                console.error('Error fetching Mars data:', error);
                setError(true);
            }

            setLoading(false);
        };

        fetchMarsData();
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
            <section id="planetmars" className="outer-content-container">
                <div className="inner-content-container">
                    <div className="planets-article-container">
                        <Link to="/" style={{ color:'#fefefe', textDecoration:'none' }}>
                            <p>{'<- Go back'}</p>
                        </Link>
                        <img src={mars} alt="logo" />

                        <div style={{ paddingLeft:'40px' }}>
                            <h2 className="cardtitle" style={{ color: '#fefefe', fontSize: '60px', textTransform: 'uppercase' }}>Mars</h2>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error fetching Mars data...</p>}
                            {marsData && (
                                <>
                                    <p style={{ color: '#fefefe', fontSize: '14px' }}>Name: {marsData.name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Discovered By: {marsData.discoveredBy}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Discovery Date: {marsData.discoveryDate}</p>
                                    <p style={{ paddingTop:'16px' }}>Gravity: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{marsData.gravity} m/s²</span></p>
                                    <p>Avg temperature at night: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{isFahrenheit ? convertToFahrenheit(-73) : -73}°{isFahrenheit ? 'F' : 'C'}</span></p>
                                    <p>Avg temperature at day: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{isFahrenheit ? convertToFahrenheit(-20) : -20}°{isFahrenheit ? 'F' : 'C'}</span></p>
                                    <p>Orbital Period: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{formatOrbitalPeriod(marsData.sideralOrbit)} days</span></p>
                                    <p>Equatorial Radius: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{marsData.equaRadius} km</span></p>
                                    <p>Polar Radius: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{marsData.polarRadius} km</span></p>
                                    <p>Mass: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{marsData.mass.massValue} × 10^{marsData.mass.massExponent} kg</span></p>
                                    <p style={{ paddingBottom:'24px' }}>Density: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{marsData.density} g/cm³</span></p>

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

export default Mars;
