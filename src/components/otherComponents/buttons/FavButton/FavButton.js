import React, {useEffect, useState} from 'react';
import styles from './FavButton.module.css';
import {GetRequest, PatchRequest} from "../../../../helpers/axiosHelper";
import Button from "../Button/Button";

function FavButton({color, demoId}) {
    const [favStatus, setFavStatus] = useState(null);
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
        async function fetchFavStatus() {
            const response = await new GetRequest(`/demos/${demoId}/isfav`).invoke();
            setFavStatus(response.data);
        }

        void fetchFavStatus();
    }, []);

    async function submitFavStatus(desiredStatus) {
        const response = await new PatchRequest(`/demos/${demoId}/setfav?status=${desiredStatus}`).invoke();
        setFavStatus(response.data);
    }

    return (
        <>
            <Button color={color} type={"button"} onClick={() => submitFavStatus(!favStatus)}>{favStatus ? "Remove" : "Add"}</Button>
        </>
    );
}

export default FavButton;