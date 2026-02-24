import React, { useEffect, useState} from 'react';
import axios from 'axios';


const EmployeeProfile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();

// useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//         navigate('/login'); // Boot them out if not logged in
//     }
// }, [navigate]);

    useEffect(() => {
        // Get logged in user from storage
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            axios.get(`http://192.168.1.15:5000/employees`)
                .then(res => {
                    const currentUser = res.data.find(emp => emp.id === loggedInUser.id);
                    setUser(currentUser);
                    setName(currentUser.name);
                    setPassword(currentUser.password);
                })
                .catch(err => console.log(err));
        }
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://192.168.1.15:5000/update-employee/${user.id}`, { name, password })
            .then(res => {
                alert("Profile Updated!");
            })
            .catch(err => console.log(err));
    };

    const getImageSrc = (buffer) => {
    // Check if buffer and the internal data array exist
    if (!buffer || !buffer.data) return "https://via.placeholder.com/150";

    // Convert the array of bytes to a Base64 string
    const binary = String.fromCharCode(...buffer.data);
    const base64String = btoa(binary);
    
    return `data:image/jpeg;base64,${base64String}`;
};

    if (!user) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 shadow p-4 rounded bg-white">
                    <div className="row">
                        {/* Profile View */}
                        <div className="col-md-4 text-center border-end">
                            <img src={getImageSrc(user.image)} alt="profile" 
                                 className="rounded-circle mb-3" 
                                 style={{width: '150px', height: '150px', objectFit: 'cover'}} />
                            <h4>{user.name}</h4>
                            <p className="text-muted">{user.email}</p>
                            <span className="badge bg-secondary">Employee ID: {user.id}</span>
                        </div>

                        {/* Update Form */}
                        <div className="col-md-8">
                            <h3 className="mb-4">Update Profile</h3>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" value={name} 
                                           onChange={e => setName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email (Locked)</label>
                                    <input type="text" className="form-control bg-light" value={user.email} disabled />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input type="password" className="form-control" value={password} 
                                           onChange={e => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;