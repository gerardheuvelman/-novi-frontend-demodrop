import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import styles from './HomePage.module.css';
import Footer from "../../components/Footer/Footer";
import DemoTilesSection from "../../components/DemoTilesSection/DemoTilesSection";
import CommendationsSection from "../../components/CommendationsSection/CommendationsSection";
import GetStartedSection from "../../components/GetStartedSection/GetStartedSection";
import HomePageMainComponent from "../../components/HomePageMainComponent/HomePageMainComponent";

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