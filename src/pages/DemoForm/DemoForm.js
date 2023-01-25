import React, {useEffect, useState} from 'react';
import './DemoForm.css';
import axios from 'axios';
import Header from "../../components/header/Header";
import {useParams} from "react-router-dom";

function DemoForm(mode) { // LET OP id moet meeggeven worden als parameter of volgt dat logisch uit de gekozen route?
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const { id } = useParams();
    const [genres, setGenres] = useState([]);
    const [demo, setDemo] = useState({});
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    // Demo details
    const [demoCreatedDate, setDemoCreatedDate] = useState(demo? demo.createdDate : null);
    const [demoTitle, setDemoTitle] = useState(demo ? demo.title : '');
    const [demoLength, setDemoLength] = useState(demo ? demo.length : 0.0);
    const [demoBPM, setDemoBPM] = useState(demo ? demo.BPM : 0.0);
    const [demoGenre, setDemoGenre] = useState(demo ? demo.genre : "No genre Specified");

    useEffect(() => { // TODO: Moderniseren
        async function fetchGenres() {
            try {
                const response = await axios.get('http://localhost:8080/genres');
                // Plaats alle genres in de state zodat we het op de pagina kunnen gebruiken
                console.log(response); // LET OP: GEEF IK OOK EEN DATA OBJECT TERUG IN DE BACK-END? (volgens mij niet)
                setGenres(response);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchGenres();
    }, []);

    useEffect(() => { // TODO: Moderniseren
        async function fetchDemo() {
            try {
                const response = await axios.get(`http://localhost:8080/demos/${id}`);
                // Plaats de demo in de state zodat we het op de pagina kunnen gebruiken
                console.log(response); // LET OP: GEEF IK OOK EEN DATA OBJECT TERUG IN DE BACK-END? (volgens mij niet)
                setDemo(response);
            } catch (e) {
                console.error(e);
            }
        }
        if (mode === 'update') {
            void fetchDemo();
        }
    }, []);

    async function createOrUpdateDemo(e, id) {
        // prevent refresh
        e.preventDefault();
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        const formData = new FormData();
        // Voeg daar ons bestand uit de state aan toe onder de key "file"
        formData.append("file", file);

        console.log(demoCreatedDate, demoTitle, demoLength, demoBPM);
        if (mode === 'create') {
            await createDemo(e);
        } else if (mode === 'update') {
            await updateDemo(e);
        }
        // now check if the user has uploded a new file. If so, sent it.
        if (file) {
            await sendImage();
        }
    }

    async function sendImage(e) {
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        const formData = new FormData();
        // Voeg daar ons bestand uit de state aan toe onder de key "file"
        formData.append("file", file);
        try {
            // verstuur ons formData object en geef in de header aan dat het om een form-data type gaat
            // Let op: we wijzigen nu ALTIJD de afbeelding voor student 1001, als je een andere student wil kiezen of dit dynamisch wil maken, pas je de url aan!
            const result = await axios.post(`http://localhost:8080/demos/${id}/file`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    async function createDemo(e) {
        try {
            // Verstuur de data in een object en zorg dat de keys overeenkomen met die in de backend
            const response = await axios.post('http://localhost:8080/demos', {
                createdDate: null,
                title: demoTitle,
                length: demoLength,
                BPM: demoBPM,
                file: null,
                genre: null,
                user: null,
                conversations: []
            });
            console.log(response.data);
            toggleCreateSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }

    async function updateDemo(e) {
        try {
            // Verstuur de data in een object en zorg dat de keys overeenkomen met die in de backend
            const response = await axios.put(`http://localhost:8080/demos/${id}`, {
                createdDate: null,
                title: demoTitle,
                length: demoLength,
                BPM: demoBPM,
                file: null, // MOETEN DEZE RELATIE VELDEN HIER OOK LEEG ZIJN?? (In backend setten?)
                genre: null,
                user: null,
                conversations: []
            });
            console.log(response.data);
            toggleUpdateSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }

    function handleFileChange(e) {
        // Sla het gekozen bestand op
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        // Sla het gekozen bestand op in de state
        setFile(uploadedFile);
        // Sla de preview URL op zodat we deze kunnen laten zien in een <img>
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    return (
        <>
            <Header>
                <h1>Demo upload form</h1>
                <h4>...to upload or edit a demo</h4>
            </Header>
            <main>
                <div className="page-container">
                    {mode === 'create' && <h1>Add a new demo</h1>}
                    {createSuccess === true && <p>Demo has been created!</p>}
                    {mode === 'update' && <h1>Update an exising demo</h1>}
                    {updateSuccess === true && <p>Demo has been updated!</p>}
                    <form onSubmit={createOrUpdateDemo}>
                        <label htmlFor="demo-title">
                            Title:
                            <input
                                type="text"
                                name="demo-title-field"
                                id="demo-title"
                                value={demoTitle}
                                onChange={(e) => setDemoTitle(e.target.value)}/>
                        </label>
                        <label htmlFor="demo-length">
                            Length:
                            <input
                                type="text"
                                name="demo-length-field"
                                id="demo-length"
                                value={demoLength}
                                onChange={(e) => setDemoLength(e.target.value)}/>
                        </label>
                        <label htmlFor="demo-bpm">
                            BPM:
                            <input
                                type="text"
                                name="demo-bpm-field"
                                id="demo-bpm"
                                value={demoBPM}
                                onChange={(e) => setDemoBPM(e.target.value)}/>
                        </label>
                        <label htmlFor="demo-genre">
                            <select
                                id="demo-genre"
                                name="demo-genre-field"
                                value={demoGenre}
                                onChange={(e) => setDemoGenre(e.target.value)}
                            >
                                {genres.map((genre) => { // LET OP: Bij tables moet hier een key staan. Moet dat ook als je <option>  returned?
                                    return <option value={genre.name}>
                                        {genre.name}
                                    </option>
                                })}
                            </select>
                        </label>
                        <label htmlFor="demo-file">
                            Choose files (.wav or .mp3):
                            <input type="file"  accept=".mp3,.wav" name="file-field" id="demo-file" onChange={handleFileChange}/>  {/*LET OP: DIT IS ALLEEN EEN VISUEEL FILTER OP BESTANDSEXTENSIES. De bacend zal nog een check moeten doen op file extentie!! */}
                        </label>
                        {/*Als er een preview url is, dan willen we deze in een audio play widget tonen (als preview)*/}
                        {previewUrl &&
                            <label>
                                 Chosen audio file:
                                {/*{AUDIOWIDGER HERE!!}*/}
                            </label>
                        }
                        <button type="submit" disabled={mode != ('create' || 'update')}>
                            {mode === 'create' && <h1>Create</h1>}
                            {mode === 'update' && <h1>Update</h1>}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default DemoForm;