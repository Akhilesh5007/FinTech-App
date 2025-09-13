// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../store/slices/authSlice";
// import { useNavigate,Link } from "react-router-dom";

// const Signup = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const auth = useSelector(s => s.auth);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(signup({ name, email, password })).unwrap();
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err || "Signup failed");
//     }
//   };
//   const formCss = {
//     border: '1px solid #3f0c85ff',
//     borderRadius: '5px',
//     padding: '10px',
//     marginLeft:'550px',
//     marginTop:'100px',
//     height:'300px',
//     width:'300px',
// };

//   return (

//      <div className="text-center" style={formCss}>
//       <h2 className="mt-3">Sign Up</h2>
//        <form className="mt-3" onSubmit={handleSubmit}>
//          <input className="m-1 " placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
//          <br />
//          <input className="m-1 " placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
//          <br />
//          <input className="m-1 "  type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
//          <br />
//          <button className=" mt-2 btn btn-outline-primary " type="submit">Create account</button>
//        </form>
//        {auth.status === "loading" && <p>Processing...</p>}
//        {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
//         <p className="mt-3">Back To Login <Link to="/Login">Login</Link></p>
//      </div>
//   );
// };
// export default Signup;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup({ name, email, password })).unwrap();
      navigate("/dashboard");
    } catch (err) {
      alert(err || "Signup failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        padding: "1rem",
      }}
    >
      <div
        style={{
          border: "1px solid #3f0c85",
          borderRadius: "10px",
          padding: "2rem 1.5rem",
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="text-center mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="btn btn-primary w-100 mb-3"
            type="submit"
            disabled={auth.status === "loading"}
          >
            {auth.status === "loading" ? "Creating..." : "Create Account"}
          </button>
        </form>

        {auth.error && <p className="text-danger text-center">{auth.error}</p>}

        <p className="text-center mt-3">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
