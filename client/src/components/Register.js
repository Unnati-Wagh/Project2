import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Use FormData because we are sending a file
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('image', file);

        axios.post('http://192.168.1.15:5000/add-employee', formData)
            .then(res => {
                alert("Registration Successful!");
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 border p-4 shadow bg-light rounded">
                    <h2 className="text-center mb-4">Employee Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label><strong>Name</strong></label>
                            <input type="text" placeholder="Enter Name" className="form-control"
                                onChange={e => setValues({...values, name: e.target.value})} required />
                        </div>
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
                        <div className="mb-3">
                            <label><strong>Profile Image</strong></label>
                            <input type="file" className="form-control"
                                onChange={e => setFile(e.target.files[0])} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;