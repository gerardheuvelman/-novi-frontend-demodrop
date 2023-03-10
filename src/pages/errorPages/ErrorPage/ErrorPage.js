import React from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link} from "react-router-dom";

function ErrorPage({redirect}) {
    return (
        <>
            <Header>
                <h1>Oops!</h1>
                <h2>Something went wrong...</h2>
            </Header>
            <main className='outer-content-container'>
                <div className='inner-content-container'>
                    <p>
                        ...and we are very sorry!

                        Click <Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link> to return to the page you came from.
                    </p>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default ErrorPage;