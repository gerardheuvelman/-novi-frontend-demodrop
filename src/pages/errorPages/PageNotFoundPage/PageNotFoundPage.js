import React from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link} from "react-router-dom";
import styles from './PageNotFoundPage.module.css';
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";


function PageNotFoundPage() {
    return (
        <>
            <Header>
                <h3>Page not found!!</h3>
                <h4>We could not find what you were looking for...</h4>
            </Header>
            <MainComponent className='outer-content-container'>
                <div className='inner-content-container'>
                    <article className='notification-article'>
                        ...and we are very sorry!

                        Click <Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link> to return to the page you came from.
                    </article>
                </div>
            </MainComponent>

            <Footer/>
        </>
    );
}

export default PageNotFoundPage;