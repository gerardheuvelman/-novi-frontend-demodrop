import {Link} from "react-router-dom";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import React from "react";
import styles from './GenreDetails.module.css';

function GenreDetails({genreDetails, mode}) { // modes:'admin'
    return (<>
        {genreDetails &&
            <section className='details-section'>
                <article className='details-info'>
                    <h4>Genre details</h4>
                    <p><strong>Genre name: </strong>{genreDetails.name}</p>
                </article>
                <article className='details-controls'>
                    <h3>Available actions</h3>
                    {mode === 'admin' &&
                        <DeleteButton
                            color='white'
                            entityName="genre"
                            entityId={genreDetails.name}
                            friendlyId={genreDetails.name}
                            mode={mode}
                            type='single'
                        >
                            Delete genre (permanently!)
                        </DeleteButton>}
                    {mode === "admin" &&
                        <span>Back to the <Link to="/admin/genres">Genre List</Link></span>}
                </article>
            </section>}
        </>
        );
        }

        export default GenreDetails;