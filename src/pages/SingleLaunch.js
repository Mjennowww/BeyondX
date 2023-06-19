import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

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
            <section className="py-32 max-width grid grid-cols-1 gap-10 md:grid-cols-2">
                <article>
                    {singleLaunch && singleLaunch.links && singleLaunch.links.patch && singleLaunch.links.patch.large ? (
                        <img
                            src={singleLaunch.links.patch.large}
                            alt={singleLaunch.name}
                        />
                    ) : (
                        <img
                            src="https://images2.imgbox.com/40/e3/GypSkayF_o.png"
                            alt=""
                        />
                    )}
                </article>

                <article>
                    <h1 className="heading">{singleLaunch && singleLaunch.name}</h1>
                    <h2 className="text-white font-bold text-xl opacity-75 mt-2">
                        Launch Date:{" "}
                        {singleLaunch && singleLaunch.success ? (
                            <span className="text-emerald-500">Successful</span>
                        ) : (
                            <span className="text-rose-500">Failed</span>
                        )}
                    </h2>

                    <p className="text-white opacity-75 my-10">
                        {singleLaunch && singleLaunch.details}
                    </p>



                    <ul className="flex flex-wrap items-center justify-start gap-8">
                        <li>

                            <a
                                href={singleLaunch && singleLaunch.links.article}
                                target="_blank"
                                rel="noreferrer"
                                className="btn"
                            >
                                Read Article
                            </a>
                        </li>
                        <li>
                            <a
                                href={singleLaunch && singleLaunch.links.presskit}
                                target="_blank"
                                rel="noreferrer"
                                className="btn"
                            >
                                Presskit
                            </a>
                        </li>
                        <li>
                            <a
                                href={singleLaunch && singleLaunch.links.webcast}
                                target="_blank"
                                rel="noreferrer"
                                className="btn"
                            >
                                Watch Launch on YouTube
                            </a>
                        </li>
                        <li>
                            <Link
                                to="/launches"
                                className="text-white opacity-75 text-sm hover:opacity-100"
                            >
                                &larr; Back
                            </Link>
                        </li>
                    </ul>
                </article>
            </section>

            {loading && <p>Loading...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
        </>
    );
}