import React from 'react';
import { Link } from 'react-router-dom';

export default function Error () {
    return (
        <>
        <section>
            <h1>Error | The requested resource could not be found </h1>
            <Link to="/">Back to Homepage</Link>
        </section>
        </>

    )


}

