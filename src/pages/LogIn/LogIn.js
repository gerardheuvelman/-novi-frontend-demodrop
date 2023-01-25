import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import axios from "axios";
import Header from "../../components/header/Header";

function LogIn() {
    const [submitted, toggleSubmitted] = useState(false);
    const {login} = useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        toggleSubmitted(true);
        console.log(submitted);
    }

    useEffect(() => {
        const controller = new AbortController();

        async function loginAsync() {
            try {
                const response = await axios.post("http://localhost:8080/authenticate", {
                    email: email,
                    password: password,
                }, {
                    signal: controller.signal,
                });
                console.log(response.data.accessToken);
                login(response.data.accessToken);
            } catch (e) {
                console.log(e)
            }
        }

        void loginAsync();
        return function cleanup() {
            controller.abort(); // <--- cancel request
            console.log("Cleanup has been executed.")
        }
    }, [submitted]);

    return (
        <>
            <Header>
                <h1>Log in</h1>
                <h4> sign in to your acccount</h4>
            </Header>
            <main>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                    molestias qui quo unde?</p>
                <form onSubmit={handleSubmit}>
                    <p>
                        <label
                            htmlFor="email">Email:
                            <input
                                type='text'
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                placeholder="type your email address"
                            />
                        </label>
                        <label
                            htmlFor="pass">
                            Password:
                            <input
                                type='password'
                                id="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                placeholder="type your password"
                            />
                        </label>
                    </p>
                    <button type="submit">Log in</button>
                </form>
                <p>Don't have an account yet? Please <Link to="/signup">Register</Link> first.</p>

            </main>
        </>
    );
}

export default LogIn;