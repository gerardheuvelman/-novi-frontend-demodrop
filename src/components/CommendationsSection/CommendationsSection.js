import React from 'react';
import styles from './CommendationsSection.module.scss';
import producer from "../../assets/producer-image.png";
import dj from "../../assets/dj-image.png";

function CommendationsSection({children}) {
    return (
        <section className='outer-container'>
            <div className='inner-container'>
                <article>
                    <img src={producer} alt="Producer commendation"/>
                    <div >
                        <h4>Producer Story</h4>
                        <p>
                            "I used to get peanuts for my tracks. But since I discovered DemoDrop, I am literally earning
                            millions!" -- anonymous producer
                        </p>
                    </div>
                </article>
                <article>
                    <img src={dj} alt="DJ commendation"/>
                    <div>
                        <h4>DJ story</h4>
                        <p>
                            "I was always paying way too much for playing music. Since I discovered DemoDrop, I pay
                            less than half of what I used to" -- DJ Don Diablo
                        </p>
                    </div>
                </article>
                {children}

            </div>
        </section>
    )
    ;
}

export default CommendationsSection;