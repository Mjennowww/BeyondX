import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

function Capsules() {
    const [capsules,setCapsules] = useState ()

    useEffect(() => {
        async function fetchCapsules() {
            try {
                const response = await axios.get('https://api.spacexdata.com/v4/capsules');
                console.log(response.data);
                setCapsules(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchCapsules();
    }, []);

    return (
       <>
           <section className="outer-content-container">
               <div className="inner-content-container">
               <h1>Capsules</h1>

               <div className="subreddit-article-container">
                   {capsules.map(
                       ({
                            id,
                            type,
                            status,
                            serial,
                            launches,
                            last_update,
                            land_landings,
                            water_landings,
                            reuse_count,
                        }) => (
                           <article key={id} className="articles">
                               <h2 className="text-xl font-bold mb-5">
                                   {type},{" "}
                                   <span className="text-base opacity-75 font-light">
                      {serial}
                    </span>
                               </h2>
                               <ul>
                                   <li className="mb-1">{launches.length} launches</li>
                                   <li className="mb-1">{land_landings} land landings</li>
                                   <li className="mb-1">{water_landings} water landings</li>
                                   <li className="mb-1">Reused {reuse_count} times</li>
                                   {status === "active" ? (
                                       <li className="text-emerald-500">Active</li>
                                   ) : (
                                       <li className="text-rose-500">Retired</li>
                                   )}
                               </ul>

                               <p className="mt-5 opacity-75">{last_update}</p>
                           </article>
                       )
                   )}
               </div>
               </div>
           </section>

       </>
    );
}

export default Capsules;