import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from './FavButton.module.css';

function FavButton({demoId}) {
    const [favStatus, setFavStatus] = useState(null);
    const storedToken = localStorage.getItem( 'token' );

    useEffect(() => { // TODO: Moderniseren
        async function fetchFavStatus() {
            try {
                const response = await axios.get(`http://localhost:8080/demos/${demoId}/isfav`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                console.log(response.data);
                setFavStatus(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchFavStatus();
    }, []);

    async function submitFavStatus(desiredStatus) {
        try {
            const response = await axios.patch(`http://localhost:8080/demos/${demoId}/setfav?status=${desiredStatus}`,{},{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            });
            console.log(response.data);
            setFavStatus(response.data);
        } catch (e) {
            console.error(e);
        }
    }

        return (
            <>
            <button type={"button"} onClick={() => submitFavStatus(!favStatus)}>{favStatus? "Remove" : "Add" }</button>
            </>
    );
}
export default FavButton;