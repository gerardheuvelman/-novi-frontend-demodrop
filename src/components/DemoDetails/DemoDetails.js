import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import styles from './DemoDetails.module.scss';

function DemoDetails({demo}) {
  const { demoId } = useParams();
  console.log('DemoDetails received the following demo parameter: ', demo );
    // console.log(demo.file.fileName);

  return (
    <>
        <section className="outer-content-container demo-specifications">
          <div className="inner-content-container">
            {Object.keys(demo).length > 0 && (
              <div className="demo-specification-details">
                <h3>Created date</h3>
                <p>{demo.createdDate}</p>
                <h3>Title</h3>
                <p>{demo.title}</p>
                <h3>Length</h3>
                <p>{demo.length}</p>
                <h3>BPM</h3>
                <p>{demo.bpm}</p>
                <h3>Filename</h3>
                <p>{demo.audioFile.fileName}</p>
                <h3>Genre</h3>
                <p>{demo.genre.name}</p>
                <h3>producer</h3>
                <p>{demo.user.username}</p>
                <p> <Link to={`/demos/${demoId}/inquire`}>Inquire about this demo</Link></p>
                <span className="back-link-wrapper">
                  <BackIcon className="back-icon"/>
                  <Link to="/">Back to home</Link>
                </span>
              </div>
            )}
          </div>
        </section>
    </>
  );
}

export default DemoDetails;