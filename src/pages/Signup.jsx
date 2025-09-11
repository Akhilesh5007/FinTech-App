import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

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

  return (

     <div style={{ padding: 20 }}>
       <form onSubmit={handleSubmit}>
         <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
         <br />
         <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
         <br />
         <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
         <br />
         <button type="submit">Create account</button>
       </form>
       {auth.status === "loading" && <p>Processing...</p>}
       {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
     </div>
  );
};

export default Signup;







//     <>
//     <div className="signup-form">
//     {/* <form action="/examples/actions/confirmation.php" method="post"> */}
//     <form onSubmit={handleSubmit}>
// 		<h2>Register</h2>
// 		<p className="hint-text">Create your account. It's free and only takes a minute.</p>
//         <div className="form-group">
// 			<div className="row">
// 				<div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="First Name" required="required"/></div>
// 				<div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="Last Name" required="required"/></div>
// 			</div>        	
//         </div>
//         <div className="form-group">
//         	<input type="email" className="form-control" name="email" placeholder="Email" required="required"/>
//         </div>
// 		<div className="form-group">
//             <input type="password" className="form-control" name="password" placeholder="Password" required="required"/>
//         </div>
// 		<div className="form-group">
//             <input type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" required="required"/>
//         </div>        
//         <div className="form-group">
// 			<label className="checkbox-inline"><input type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
// 		</div>
// 		<div className="form-group">
//             <button type="submit" className="btn btn-success btn-lg btn-block">Register Now</button>
//         </div>
//     </form>
// 	<div className="text-center">Already have an account? <a href="#">Sign in</a></div>
// </div>
// </>
    