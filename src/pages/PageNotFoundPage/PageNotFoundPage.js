import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Link} from "react-router-dom";
import styles from './PageNotFoundPage.module.css';


function PageNotFoundPage() {
    return (
        <>
            <Header>
                <h1>Page not found!!</h1>
                <h2>We could not find what you were looking for...</h2>
            </Header>
            <main className='outer-content-container'>
                <div className='inner-content-container'>
                    <p>
                        ...and we are very sorry!

                        Perhaps visit our <Link to={'/'}>Home page</Link> and try again from there.
                    </p>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default PageNotFoundPage;