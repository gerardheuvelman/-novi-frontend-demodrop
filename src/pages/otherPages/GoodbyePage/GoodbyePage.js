import React from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link, useNavigate} from "react-router-dom";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function GoodbyePage() {
    const navigate = useNavigate();
    return (
        <>
            <Header>
                <h3>Goodbye!</h3>
                <h4> We are sorry to see you go...</h4>
            </Header>
            <MainComponent className='outer-content-container'>
                <div className='inner-content-container'>
                    <article className='notification-article'>
                        It seems you are leaving us.

                        Perhaps we will meet again...

                        Click <Link onClick={navigate('/')}>here</Link> to return to our home page page.
                    </article>
                </div>
            </MainComponent>

            <Footer/>
        </>
    );
}

export default GoodbyePage;