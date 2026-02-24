import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeProfile from "./components/EmployeeProfile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/admin-dashboard"
          element={
            <div className="container mt-5">
              <h2>Admin Dashboard (Employee List)</h2>
            </div>
          }
        />
        <Route
          path="/employee-profile"
          element={
            <div className="container mt-5">
              <h2>Employee Profile Page</h2>
            </div>
          }
        /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
