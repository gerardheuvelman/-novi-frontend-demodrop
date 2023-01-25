import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/header/Header";

function Register() {
    const [submitted, toggleSubmitted] = useState(false);
    const { login } = useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    //const navigate = useNavigate(); optioneel!

    function handleSubmit (e) {
        e.preventDefault();
        toggleSubmitted(true);
        console.log(submitted);
    }
    useEffect(()=> {
        const controller = new AbortController();
        async function registerAsync() {
            try {
                const response = await axios.post("http://localhost:8080/users", {
                    email: email,
                    password: password,
                    username: username
                }, {
                    signal: controller.signal,
                });
                console.log(response.data.accessToken);
                login(response.data.accessToken); // Instead of ths you can also use  navigate("/signin") to NOT login directly.
            }
            catch(e) {
                console.log(e)
            }
        }
        void registerAsync();
        return function cleanup() {
            controller.abort(); // <--- Cancel request
            console.log("Cleanup has been executed")
        }
    }, [submitted]);

    return (
    <>
        <Header>
            <h1>Register</h1>
            <h4>create a new user account</h4>
        </Header>
        <main>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={ handleSubmit }>
                <p>
                    <label
                        htmlFor="email">Email:
                        <input
                            type='email'
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
                    <label
                        htmlFor="username">
                        Username:
                        <input
                            type='text'
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            placeholder="type your user name"
                        />
                    </label>
                </p>
                <button type="submit">Register</button>
            </form>
            <p>Have an account already? Sign in <Link to="/signin">here</Link> .</p>
        </main>
    </>
  );
}

export default Register;