import React, {useEffect, useState} from 'react';
import './HomePage.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/DemoDropLogo.png';
import producer from '../../assets/producer-image.png';
import dj from '../../assets/dj-image.png';
import DemoTile from "../../components/DemoTile/DemoTile";
import styles from './HomePage.module.scss';

function HomePage() {
    const [demos, setDemos] = useState([]);
    const navigate = useNavigate();

    //TODO: moderniseren
    useEffect(() => {
        async function fetchShortDemoList() {
            try {
                const response = await axios.get('http://localhost:8080/demos/?limit=12');
                console.log(response.data);
                setDemos(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchShortDemoList();
    }, [])

    return (
        <>
            <Header>
                <img src={logo} alt="DemoDrop header logo"/>
                <h1>Welcome to DemoDrop!</h1>
                <h2>the premier music demo trading platform</h2>
            </Header>
            <main>
                <section className="outer-content-container demo-list">
                    <div className="inner-content-container">
                        <h2>Listen to our latest demos</h2>
                        <div className="demos-article-container">
                            {demos.map((demo) => {
                                return <DemoTile demo={demo} key={demo.demoId}/>
                            })}
                        </div>
                    </div>
                </section>
                <section className="outer-content-container commendations">
                    <article className="commendations-article">
                        <span className="commendations-article__image-wrapper">
                            <img src={producer} alt="Producer commendation"/>
                        </span>
                        <div className="commendations-article__info-container">
                            <h4>Producer Story</h4>
                            <div className="producer-article__title-squiggle"></div>
                            <p>"I used to get peanuts for my tracks. But since I discovered DemoDrop, I am literally earning millions!" -- anonymous producer</p>
                        </div>
                    </article>
                    <article className="commendations-article">
                <span className="commendations-article__image-wrapper">
                    <img src={dj} alt="DJ commendation"/>
                </span>
                        <div className="commendations-article__info-container">
                            <h4>DJ story</h4>
                            <div className="commendations-article__title-squiggle"></div>
                            <p>"I was always paying way too much for playing music. Since I discovered DemoDrop, I pay
                                less than half of what I used to" -- DJ Don Diablo</p>
                        </div>
                    </article>
                </section>
                <section className="outer-content-container get started">
                    <button
                        type='button'
                        onClick={() => navigate('/demos/drop')}
                    >
                        Drop your demo
                    </button>
                    <span>Get started today!</span>
                    <button
                        type='button'
                        onClick={() => navigate('/demos')}
                    >
                        Search demos
                    </button>
                </section>
            </main>
        </>
    );
}

export default HomePage;