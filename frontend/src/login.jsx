import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function sign() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting with email:', email, 'and password:', password);
        axios.post('http://localhost:3000/login', { email, password })
            .then(res => {
                console.log('Response:', res.data);
                if (res.data === 'success') {
                    navigate('/home');
                }
            })
            .catch(err => console.log(err));
    };
    
    return (
        <div className="container mt-5">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" name="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" name="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">login</button>
            </form>
            <h1>if u dont have an account register</h1>
            <Link to={'/register'} type="submit" className="btn btn-success">register</Link >
        </div>
    )
}
