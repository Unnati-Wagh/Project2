import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       navigate("/login"); // Boot them out if not logged in
//     }
//   }, [navigate]);

  const fetchEmployees = () => {
    axios
      .get("http://192.168.1.15:5000/employees")
      .then((res) => {
        console.log("Data from server:", res.data);

        const onlyEmployees = res.data.filter((emp) => emp.role !== "admin");
        setEmployees(onlyEmployees);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://192.168.1.15:5000/delete-employee/${id}`)
        .then((res) => {
          setSelectedEmp(null); // Clear detail view
          fetchEmployees(); // Refresh list and count instantly
        })
        .catch((err) => console.log(err));
    }
  };

  // Helper to convert Buffer to Base64
  const getImageSrc = (buffer) => {
    // Check if buffer and the internal data array exist
    if (!buffer || !buffer.data) return "https://via.placeholder.com/150";

    // Convert the array of bytes to a Base64 string
    const binary = String.fromCharCode(...buffer.data);
    const base64String = btoa(binary);

    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="container-fluid mt-4">
     
      <div className="row">
        {/* LEFT SIDE: List & Count */}
        <div
          className="col-md-4 border-end"
          style={{ height: "85vh", overflowY: "auto" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Employees</h3>
            <span className="badge bg-primary fs-5">
              Count: {employees.length}
            </span>
          </div>
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="card mb-3 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedEmp(emp)}
            >
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={getImageSrc(emp.image)}
                    className="img-fluid rounded-start h-100"
                    alt="emp"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="col-8">
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1">{emp.name}</h6>
                    <p className="card-text small text-muted mb-0">
                      ID: {emp.id}
                    </p>
                    <p className="card-text small text-muted">{emp.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: Detail View */}
        <div className="col-md-8">
          {selectedEmp ? (
            <div className="p-5 text-center shadow rounded bg-white mt-3">
              <img
                src={getImageSrc(selectedEmp.image)}
                className="rounded-circle mb-3"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  border: "5px solid #0d6efd",
                }}
              />
              <h2>{selectedEmp.name}</h2>
              <p className="text-muted fs-4">{selectedEmp.email}</p>
              <p className="fw-bold">Employee ID: {selectedEmp.id}</p>
              <button
                className="btn btn-danger mt-4 px-5"
                onClick={() => handleDelete(selectedEmp.id)}
              >
                Delete Employee
              </button>
            </div>
          ) : (
            <div className="h-100 d-flex align-items-center justify-content-center text-muted">
              <h4>Select an employee to see details</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
