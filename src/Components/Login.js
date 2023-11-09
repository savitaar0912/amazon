import '../CSS/Login.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase'
import { selectUserEmail, setUserLogin } from '../Store/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userEmail = useSelector(selectUserEmail)

    const setUser = (user) => {
        console.log(user)
        // console.log(user.multiFactor.user)
        dispatch(
            setUserLogin({
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
        });
    }, [userEmail]);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log('Login start');
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const user = result.user;
            console.log('Login successful. Result:', user);
            setUser(user);
        } catch (err) {
            console.error('Login error:', err.message);
        }
    };

    const handleSignUp = (e) => {
        // Implement your login logic here
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
                alert('Account created')
                navigate('/')
            })
            .catch((err) => alert(err.message));
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
