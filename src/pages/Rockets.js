import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Rockets() {
  const [rockets, setRockets] = useState([]);
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRockets() {
      toggleLoading(true);
      setError(false);

      try {
        const response = await axios.get('https://api.spacexdata.com/v4/rockets');
        console.log(response.data);
        setRockets(response.data);
      } catch (e) {
        console.error(e);
        setError(true);
      }

      toggleLoading(false);
    }

    fetchRockets();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading spinner or message
  }

  if (error) {
    return <div>Error occurred while fetching rockets.</div>; // Render an error message
  }

  return (
    <>
      <section>
        <h1>Rockets</h1>

        <div>
          {rockets.map(({ id, name, flickr_images, description }) => (
            <Link to={`/rockets/${id}`} key={id}>
              <article className="bg-zinc-900">
                {flickr_images && flickr_images.length > 0 && flickr_images[0] && (
                  <img src={flickr_images[0]} alt={name} />
                )}

                <div>
                  <h2>{name}</h2>
                  <p>{description ? `${description.substring(0, 100)}...` : ''}</p>
                  <Link to={`/rockets/${id}`} className="btn">
                    Read More &rarr;
                  </Link>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
