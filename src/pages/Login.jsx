// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../store/slices/authSlice";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const auth = useSelector(s => s.auth);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(login({ email, password })).unwrap();
//       // success
//       navigate("/Home");
//     } catch (err) {
//       // err is available in auth.error as well; but we show alert for quick feedback
//       alert(err || "Login failed");
//     }
//   };
//   const formstyle={
//     border:'1px solid red'
//   }
//   const formst={
//     border:'1px solid black',
//     height:'400px',
//     width:'300px',
//     marginLeft:'40px auto'
//   }
//   return (
//     <div className="text-center" style={formstyle}>

//     <div  style={formst}>
//       <h2 className=" mt-4 " > Login</h2>
//       <form onSubmit={handleSubmit} >
//         <input className="mt-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
//         <br />
//         <input className="mt-2 " type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
//         <br />
//         <button className="mt-2 btn btn-outline-success " type="submit">Login</button>

//       </form>
//       {auth.status === "loading" && <p>Loading...</p>}
//       {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
//       <p className="mt-5">Don't have account? <Link to="/signup">Signup</Link></p>
//     </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/Home");
    } catch (err) {
      alert(err || "Login failed");
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
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "2rem 1.5rem",
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
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
            className="btn btn-success w-100 mb-3"
            type="submit"
            disabled={auth.status === "loading"}
          >
            {auth.status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        {auth.error && <p className="text-danger text-center">{auth.error}</p>}

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
