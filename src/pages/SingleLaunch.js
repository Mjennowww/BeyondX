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

                <article className="singleLaunch">
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
                    <h1 >{singleLaunch && singleLaunch.name}</h1>
                    <h2>
                        Launch Date:{" "}
                        {singleLaunch && singleLaunch.success ? (
                            <span>Successful</span>
                        ) : (
                            <span >Failed</span>
                        )}
                    </h2>

                    <p>
                        {singleLaunch && singleLaunch.details}
                    </p>



                    <ul className="singleLaunchDetails">
                        <li>

                            <a
                                href={singleLaunch && singleLaunch.links.article}
                                target="_blank"
                                rel="noreferrer"
                                className="button button2"
                            >
                                Read Article
                            </a>
                        </li>
                        <li>
                            <a
                                href={singleLaunch && singleLaunch.links.presskit}
                                target="_blank"
                                rel="noreferrer"
                                className="button button3"
                            >
                                Presskit
                            </a>
                        </li>
                        <li>
                            <a
                                href={singleLaunch && singleLaunch.links.webcast}
                                target="_blank"
                                rel="noreferrer"
                                className="button button1"
                            >
                                Watch Launch on YouTube
                            </a>
                        </li>
                        <li>
                            <Link
                                to="/launches"

                            >
                                &larr; Back
                            </Link>
                        </li>
                    </ul>
                </article>
                </div>
            </section>

            {loading && <p>Loading...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
        </>
    );
}