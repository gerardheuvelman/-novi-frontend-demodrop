import React, {useEffect, useState} from 'react';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import styles from './HomePage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import DemoTilesSection from "../../../components/otherComponents/homPageComponents/DemoTilesSection/DemoTilesSection";
import CommendationsSection from "../../../components/otherComponents/homPageComponents/CommendationsSection/CommendationsSection";
import GetStartedSection from "../../../components/otherComponents/homPageComponents/GetStartedSection/GetStartedSection";
import HomePageMainComponent from "../../../components/otherComponents/homPageComponents/HomePageMainComponent/HomePageMainComponent";

function HomePage() {

    return (
        <>
            <Header>
                <h1>Welcome to DemoDrop!</h1>
                <h2>the premier music demo trading platform</h2>
            </Header>
            <HomePageMainComponent>
                <DemoTilesSection/>
                <CommendationsSection/>
                <GetStartedSection/>
            </HomePageMainComponent>
            <Footer/>
        </>
    );
}

export default HomePage;