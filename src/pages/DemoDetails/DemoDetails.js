import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './DemoDetails.css';
import Header from '../../components/header/Header';
import { ReactComponent as BackIcon } from '../../assets/back.svg';

function DemoDetails() {
  const [demo, setDemo] = useState({});
  const { id } = useParams();

  useEffect(() => { // TODO moderniseren!!
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/demos/${id}`);
        console.log(response);
        setDemo(response);
      } catch (e) {
        console.error(e);
      }
    }
    if (id) {
      void fetchData();
    }
  }, [id]);

  return (
    <>
      <Header>
        <h1>Demo id: {id}</h1>
        <h4>Demo specifications</h4>
      </Header>
      <main>
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
                <p>{demo.BPM}</p>
                <h3>Filename</h3>
                <p>{demo.fileString}</p>
                <h3>Filename</h3>
                <p>{demo.genreString}</p>
                <h3>producer</h3>
                <p>{demo.userString}</p>
                <span className="back-link-wrapper">
                  <BackIcon className="back-icon"/>
                  <Link to="/">Back to home</Link>
                </span>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default DemoDetails;