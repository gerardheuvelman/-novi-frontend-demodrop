import React, {useContext} from 'react';
import PublicNavBar from "./PublicNavBar/PublicNavBar";
import styles from './Header.module.css';
import logo from '../../../../assets/DemoDropLogo.png';
import {NavLink} from "react-router-dom";
import PrivateNavBar from "./PrivateNavBar/PrivateNavBar";
import {AuthContext} from "../../../../context/AuthContext";

function Header({ children }) {
    const {isAuth, user} = useContext(AuthContext);

    function getGreeting() {
        const date = new Date();
        const hours = date.getHours();

        if (hours >= 6 && hours < 12) {
            return "Good morning, ";
        } else if (hours >= 12 && hours < 18) {
            return "Good afternoon, ";
        } else if (hours >= 18 && hours <= 23 ) {
            return "Good evening, ";
        } else {
            return "Go to bed, ";
        }
    }

    return (
    <header className="outer-content-container" >
      <div className="inner-content-container">
          <div className={styles['navbar-container']}>
              <NavLink className={styles['logo-link']} to="/"><img className={styles['logo']} src={logo} alt="DemoDrop header logo"/></NavLink>
              {user && <span className={styles['greeting']}>{getGreeting()} <strong>{`${user.username}!`}</strong>!</span>}
              <div className={styles['stacked-navbars']}>
                  <PublicNavBar/>
                  {isAuth && <PrivateNavBar/>}
              </div>
          </div>
        <div className={styles['hero-content']}>
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;