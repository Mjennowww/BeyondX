import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <>
            <section className="outer-content-container">
                <div className="inner-content-container">

                        <h2 style={{ paddingTop: '40%' }}>Error | The requested resource could not be found </h2>
                        <button
                            onClick={() => window.open("/", '_blank')}
                            className="button button3"
                        >
                            Back to Homepage
                        </button>

                </div>
            </section>
        </>
    );
}
