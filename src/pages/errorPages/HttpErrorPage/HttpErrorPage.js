import React from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import HomePageMainComponent from "../../../components/otherComponents/homPageComponents/HomePageMainComponent/HomePageMainComponent";
import DemoTilesSection from "../../../components/otherComponents/homPageComponents/DemoTilesSection/DemoTilesSection";
import CommendationsSection from "../../../components/otherComponents/homPageComponents/CommendationsSection/CommendationsSection";
import GetStartedSection from "../../../components/otherComponents/homPageComponents/GetStartedSection/GetStartedSection";
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link} from "react-router-dom";

function HttpErrorPage({redirect}) {
    return (
        <>
            <Header>
                <h1>Http Error!</h1>
                <h2>Something went wrong requesting data from the internet...</h2>
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

export default HttpErrorPage;