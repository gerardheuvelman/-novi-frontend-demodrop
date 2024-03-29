import React from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link} from "react-router-dom";

function HttpErrorPage() {
    return (
        <>
            <Header>
                <h3>Http error!</h3>
                <h4>Something went wrong requesting data from the internet...</h4>
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

export default HttpErrorPage;