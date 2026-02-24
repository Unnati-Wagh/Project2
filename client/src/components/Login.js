import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://192.168.1.15:5000/login', values)
            .then(res => {
                if (res.data.status === "Success") {
                   
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    
                    if (res.data.user.role === 'admin') {
                        navigate('/admin-dashboard');
                    } else {
                        navigate('/employee-profile');
                    }
                }
            })
            .catch(err => {
                alert(err.response?.data?.message || "Login failed");
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 border p-4 shadow bg-light rounded">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label><strong>Email</strong></label>
                            <input type="email" placeholder="Enter Email" className="form-control"
                                onChange={e => setValues({...values, email: e.target.value})} required />
                        </div>
                        <div className="mb-3">
                            <label><strong>Password</strong></label>
                            <input type="password" placeholder="Enter Password" className="form-control"
                                onChange={e => setValues({...values, password: e.target.value})} required />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;