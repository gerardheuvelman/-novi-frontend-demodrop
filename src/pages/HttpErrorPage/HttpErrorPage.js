import React from 'react';
import Header from "../../components/Header/Header";
import HomePageMainComponent from "../../components/HomePageMainComponent/HomePageMainComponent";
import DemoTilesSection from "../../components/DemoTilesSection/DemoTilesSection";
import CommendationsSection from "../../components/CommendationsSection/CommendationsSection";
import GetStartedSection from "../../components/GetStartedSection/GetStartedSection";
import Footer from "../../components/Footer/Footer";
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

                        Click <Link to={redirect}>here</Link> to return to the page you cam from.
                    </p>
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default HttpErrorPage;