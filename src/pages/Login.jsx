import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(s => s.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      // success
      navigate("/dashboard");
    } catch (err) {
      // err is available in auth.error as well; but we show alert for quick feedback
      alert(err || "Login failed");
    }
  };
  const formCss = {
    border: '1px solid #3f0c85ff',
    borderRadius: '5px',
    padding: '10px',
    marginLeft:'550px',
    marginTop:'100px',
    height:'400px',
    width:'400px',
};


  return (
    <div className="text-center" style={formCss}  >
      <h2 className="mt-5">Login</h2>
      <form onSubmit={handleSubmit} >
        <input className="mt-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <br />
        <input className="m-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <br />
        <button className="btn btn-outline-success " type="submit">Login</button>

      </form>
      {auth.status === "loading" && <p>Loading...</p>}
      {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
      <p>Don't have account? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default Login;
