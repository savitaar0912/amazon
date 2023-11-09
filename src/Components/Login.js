import '../CSS/Login.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail, setUserLogin, setUserLogout } from '../Store/user/userSlice';
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userEmail = useSelector(selectUserEmail)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const setUser = (user) => {
        console.log(user)
        console.log(user.multiFactor.user)
        dispatch(
            setUserLogin({
                name: user.displayName,
                email: user.email,
            })
        )
    }

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                navigate("/")
            }
        })
    }, [userEmail])

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        // Implement your login logic here
        console.log('login start')
        if (!userEmail) {
            auth.signInWithEmailAndPassword(email, password)
                .then((result) => {
                    console.log("Login successful. Result:", result);
                    setUser(result.user);
                    console.log("User:", result.user);
                    // navigate('/');
                })
                .catch((err) => {
                    console.error("Login error:", err.message);
                    // alert(err.message);
                });
        }
        else if(userEmail){
            dispatch(setUserLogout())
        }
    };


    // console.log(userEmail);


    const handleSignUp = () => {
        // Implement your login logic here
        // auth.createUserWithEmailAndPassword(email, password)
        //     .then((result) => {
        //         console.log(result.user)
        //         alert('Account created')
        //     })
        //     .catch((err) => alert(err.message));
        dispatch(setUserLogout())
        console.log("it'll be null" ,userEmail)
    };

    return (
        <div className="login">
            <div className="signin_logo">
                <Link to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazon.in" />
                </Link>
            </div>
            <div className="login-container">
                <h1>Sign in to your Amazon account</h1>
                <form>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Your email"
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Your password"
                    />
                    <button onClick={handleLogin}>Sign In</button>
                </form>
                <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                <p>New to Amazon?
                    <button className='account' onClick={handleSignUp}>Create your Amazon account</button>
                </p>
            </div>
        </div>
    );
}
