import React, {useEffect, useState} from 'react';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import styles from './HomePage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import DemoTilesSection from "../../../components/otherComponents/homPageComponents/DemoTilesSection/DemoTilesSection";
import CommendationsSection from "../../../components/otherComponents/homPageComponents/CommendationsSection/CommendationsSection";
import GetStartedSection from "../../../components/otherComponents/homPageComponents/GetStartedSection/GetStartedSection";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function HomePage() {

    return (
        <>
            <Header>
                <h3>Welcome to DemoDrop!</h3>
                <h4>the premier music demo trading platform</h4>
            </Header>
            <MainComponent>
                <DemoTilesSection/>
                <CommendationsSection/>
                <GetStartedSection/>
            </MainComponent>
            <Footer/>
        </>
    );
}

export default HomePage;