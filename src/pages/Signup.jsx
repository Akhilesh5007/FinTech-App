import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/slices/authSlice";
import { useNavigate,Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(s => s.auth);
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
  const formCss = {
    border: '1px solid #3f0c85ff',
    borderRadius: '5px',
    padding: '10px',
    marginLeft:'550px',
    marginTop:'100px',
    height:'300px',
    width:'300px',
};

  return (

     <div className="text-center" style={formCss}>
      <h2 className="mt-3">Sign Up</h2>
       <form className="mt-3" onSubmit={handleSubmit}>
         <input className="m-1 " placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
         <br />
         <input className="m-1 " placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
         <br />
         <input className="m-1 "  type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
         <br />
         <button className=" mt-2 btn btn-outline-primary " type="submit">Create account</button>
       </form>
       {auth.status === "loading" && <p>Processing...</p>}
       {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
        <p className="mt-3">Back To Login <Link to="/Login">Login</Link></p>
     </div>
  );
};
export default Signup;