import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [nextLaunch, setNextLaunch] = useState(null);

    useEffect(() => {
        async function fetchNextLaunch() {
            try {
                const response = await axios.get('https://api.spacexdata.com/v4/launches/next');
                console.log(response.data);
                setNextLaunch(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchNextLaunch();
    }, []);

    const formatNextLaunchTime = () => {
        if (nextLaunch && nextLaunch.date_local) {
            const launchTime = new Date(nextLaunch.date_local);
            return launchTime.toLocaleString('nl-NL', {
                timeZone: 'Europe/Amsterdam',
            });
        }
        return '';
    };

    return (
        <>
            <section id="home" className="outer-content-container">
                <div className="inner-content-container">
                    <h1 style={{ textAlign: 'center' }}>EXPLORE OUR<br />NEW HOME</h1>

                    <article className="headquarters">
                        Next Launch:&nbsp;<div>{formatNextLaunchTime()}</div>
                    </article>
                </div>
            </section>
        </>
    );
}

export default Home;