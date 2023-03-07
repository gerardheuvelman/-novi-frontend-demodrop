import React from 'react';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
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

                        Click <Link to={redirect}>here</Link> to return to the page you tried to navigate to.
                    </p>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default ErrorPage;