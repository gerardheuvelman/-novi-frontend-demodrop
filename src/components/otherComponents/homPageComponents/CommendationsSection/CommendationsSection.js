import React from 'react';
import styles from './CommendationsSection.module.css';
import producer from "../../../../assets/producer-image.png";
import dj from "../../../../assets/dj-image.png";

function CommendationsSection({children}) {
    return (
        <section className={styles['commendations-section']}>
                <h3 className={styles['commendations-header']}>Commendations</h3>
                <article className={styles['commendation-article']}>
                    <img className={styles['commendation-article-image']} src={producer} alt="Producer commendation"/>
                    <div className={styles['commendation-article-text']} >
                        <h3>Producer Story</h3>
                        <p className={styles['commendation-article-text-paragraph']} >
                            "I used to get peanuts for my tracks. But since I discovered DemoDrop, I am literally earning
                            millions!" -- anonymous producer
                        </p>
                    </div>
                </article>
                <article className={styles['commendation-article']}>
                    <img className={styles['commendation-article-image']} src={dj} alt="DJ commendation"/>
                    <div className={styles['commendation-article-text']}>
                        <h3>DJ story</h3>
                        <p className={styles['commendation-article-text-paragraph']}>
                            "I was always paying way too much for playing music. Since I discovered DemoDrop, I pay
                            less than half of what I used to" -- DJ Don Diablo
                        </p>
                    </div>
                </article>
                {children}
        </section>
    )
    ;
}

export default CommendationsSection;