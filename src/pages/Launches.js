import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import React from "react";


export default function Launches() {
    const [launches, setLaunches] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchLaunches() {
            try {
                const response = await axios.get("https://api.spacexdata.com/v4/launches");
                console.log(response.data);
                setLaunches(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchLaunches();
    }, []);

    const handleClickNext = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleClickPrevious = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    // Bepaal de index van het eerste en laatste item op de huidige pagina
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter de lanceeracties op basis van de huidige pagina
    const visibleLaunches = launches.slice(startIndex, endIndex);

    return (
        <>
            <section id="launches" className="outer-content-container">
                <div className="inner-content-container">
                <h1>Launches</h1>
                    <div className="article-container">
                    {visibleLaunches.map(({ id, name, links, details }) => (
                        <div className="card article">

                        <Link to={`/launches/${id}`} style={{textDecoration:'none'}} key={id}>
                            <img src={logo} alt="logo" width="100" />
                            {links.patch.large ? (
                                <img className="launchimage" src={links.patch.small} alt={name} />
                            ) : (
                                <img src="https://images2.imgbox.com/40/e3/GypSkayF_o.png" alt="" />
                            )}
                            <h2 style={{ color: '#fefefe', fontWeight:'500', fontSize: '32px',textDecoration:'none', textAlign:'center', padding:'24px' , textTransform:'uppercase' }}>{name}</h2>
                            <p style={{ color: '#fefefe', textAlign:'center'  }}>
                                {details && details.length > 30 ? `${details.substring(0, 30)}...` : details}
                            </p>
                        </Link>
                        </div>

                    ))}
                </div>
                <div>
                    <button
                        className="button3 button"
                        onClick={handleClickPrevious}
                        disabled={page === 1}
                    >
                        Vorige
                    </button>
                    <button className="button1 button"
                        onClick={handleClickNext}
                        disabled={endIndex >= launches.length}
                    >
                        Volgende
                    </button>
                </div>
                </div>
            </section>
        </>
    );
}