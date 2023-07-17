import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function SingleLaunch() {
    const [singleLaunch, setSingleLaunch] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchSingleLaunch() {
            toggleLoading(true);
            setError(false);

            try {
                const response = await axios.get(
                    `https://api.spacexdata.com/v4/launches/${id}`
                );
                console.log(response.data);
                setSingleLaunch(response.data);
            } catch (e) {
                console.error(e);
                setError(true);
            }

            toggleLoading(false);
        }

        fetchSingleLaunch();
    }, [id]);

    return (
        <>
            <section id="launches" className="outer-content-container">
                <div className="inner-content-container">
                    <div className="cardmoon article">
                        <article className="singleLaunch" style={{padding:'20px'}}>
                            <div style={{ display: 'flex',  alignSelf: 'flex-start' }}>
                                <Link to="/launches" style={{ color: '#fefefe', textDecoration: 'none' }}>
                                    <p>{'<- Go back'}</p>
                                </Link>
                            </div>

                            {singleLaunch && singleLaunch.links && singleLaunch.links.patch && singleLaunch.links.patch.large ? (
                                <img
                                    src={singleLaunch.links.patch.large}
                                    alt={singleLaunch.name}
                                    width="20%"
                                    margin="0 0 auto"
                                />
                            ) : (
                                <img
                                    src="https://images2.imgbox.com/40/e3/GypSkayF_o.png"
                                    alt=""
                                />
                            )}

                            <h1 style={{ color: '#fefefe', fontSize: '70px' }}>{singleLaunch && singleLaunch.name}</h1>
                            <h2 style={{ color: '#fefefe'}}>
                                Launch Date:{" "}
                                {singleLaunch && singleLaunch.success ? (
                                    <span style={{ padding:'10px', backgroundColor:'#27a503', color: '#fefefe' }}>Successful</span>
                                ) : (
                                    <span style={{ padding:'10px', backgroundColor:'#FF6901', color: '#fefefe' }}>Failed</span>
                                )}
                            </h2>

                            <p>
                                {singleLaunch && singleLaunch.details}
                            </p>

                            <ul className="singleLaunchDetails">
                                <li>
                                    {singleLaunch && singleLaunch.links && singleLaunch.links.article && (
                                        <button
                                            onClick={() => window.open(singleLaunch.links.article, '_blank')}
                                            className="button button3"
                                            style={{ marginRight: '10px' }}
                                        >
                                            Read Article
                                        </button>
                                    )}
                                </li>
                                <li>
                                    {singleLaunch && singleLaunch.links && singleLaunch.links.presskit && (
                                        <button
                                            onClick={() => window.open(singleLaunch.links.presskit, '_blank')}
                                            className="button button3"
                                        >
                                            Presskit
                                        </button>
                                    )}
                                </li>
                                <li>
                                    {singleLaunch && singleLaunch.links && singleLaunch.links.webcast && (
                                        <button
                                            onClick={() => window.open(singleLaunch.links.webcast, '_blank')}
                                            className="button button1"
                                        >
                                            Watch Launch on YouTube
                                        </button>
                                    )}
                                </li>
                            </ul>
                        </article>
                    </div>
                </div>
            </section>

            {loading && <p>Loading...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
        </>
    );
}
