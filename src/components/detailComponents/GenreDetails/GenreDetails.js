import {Link} from "react-router-dom";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import React from "react";
import styles from './GenreDetails.module.css';

function GenreDetails({genreDetails, mode}) { // modes:'admin'
    return <>
        <section>
            <h2>Genre details</h2>
            <p><strong>Genre name: </strong>{genreDetails.name}</p>
            {mode === 'admin' && <p><Link to={`/admin/genres/${genreDetails.name}/edit`}>Rename Genre</Link></p>}
            {mode === 'admin' && <p><DeleteButton entityName="genre" entityId={genreDetails.name} friendlyId={genreDetails.name} mode={mode}>Delete genre (permanently!)</DeleteButton></p>}
        </section>
        {mode === "admin" && <section>
            {<p>Back to the <Link to="/admin/genres">Genre List</Link></p>}
        </section>}
    </>;
}

export default GenreDetails;