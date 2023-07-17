import React, { useState, useEffect } from 'react';
import titan from "../assets/image-titan.png";
import { Link } from 'react-router-dom';

function Titan() {
    const [titanData, setTitanData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isFahrenheit, setIsFahrenheit] = useState(false);

    useEffect(() => {
        const fetchTitanData = async () => {
            setLoading(true);
            setError(false);

            try {
                const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies/titan');
                const data = await response.json();
                setTitanData(data);
            } catch (error) {
                console.error('Error fetching Titan data:', error);
                setError(true);
            }

            setLoading(false);
        };

        fetchTitanData();
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
            <section id="planettitan" className="outer-content-container">
                <div className="inner-content-container">
                    <div className="planets-article-container">
                        <Link to="/" style={{ color:'#fefefe', textDecoration:'none' }}>
                            <p>{'<- Go back'}</p>
                        </Link>
                        <img src={titan} alt="logo" />

                        <div style={{ paddingLeft:'40px' }}>
                            <h2 className="cardtitle" style={{ color: '#fefefe', fontSize: '60px', textTransform: 'uppercase' }}>Titan</h2>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error fetching Titan data...</p>}
                            {titanData && (
                                <>
                                    <p style={{ color: '#fefefe', fontSize: '14px' }}>Name: {titanData.name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Discovered By: {titanData.discoveredBy}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Discovery Date: {titanData.discoveryDate}</p>
                                    <p style={{ paddingTop:'16px' }}>Gravity: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{titanData.gravity} m/s²</span></p>
                                    <p>Avg temperature at night: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{isFahrenheit ? convertToFahrenheit(-179) : -179}°{isFahrenheit ? 'F' : 'C'}</span></p>
                                    <p>Avg temperature at day: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{isFahrenheit ? convertToFahrenheit(-290) : -290}°{isFahrenheit ? 'F' : 'C'}</span></p>
                                    <p>Orbital Period: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{formatOrbitalPeriod(titanData.sideralOrbit)} days</span></p>
                                    <p>Equatorial Radius: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{titanData.equaRadius} km</span></p>
                                    <p>Polar Radius: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{titanData.polarRadius} km</span></p>
                                    <p>Mass: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{titanData.mass.massValue} × 10^{titanData.mass.massExponent} kg</span></p>
                                    <p style={{ paddingBottom:'24px' }}>Density: <span style={{ fontWeight:'bold', fontSize:'18px', color: '#f78429' }}>{titanData.density} g/cm³</span></p>

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

export default Titan;
