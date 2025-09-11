import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJewelry, addJewelry, updateJewelry, deleteJewelry } from "../store/slices/jewelrySlice";
import JewelryList from "../components/JewelryList";
import { useNavigate } from "react-router-dom";
import Deposits from "../components/Deposit";
const Jewelry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jewelry, status } = useSelector(s => s.jewelry);
  const { user } = useSelector(s => s.auth);

  const [form, setForm] = useState({ id: null, name: "", type: "", price: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user?.id) dispatch(fetchJewelry(user.id));
  }, [dispatch, user?.id]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.id) { alert("Login required"); return; }
    const item = { ...form, userId: user.id,name:form.name, price: Number(form.price) };

    if (editing) {
      dispatch(updateJewelry(item));
    } else {
      dispatch(addJewelry(item));
    }
    setForm({ id: null, name: "", type: "", price: "" });
    setEditing(false);
  };

  const handleEdit = (it) => { setForm({ id: it.id, name: it.name, type: it.type, price: it.price }); setEditing(true); };
  const handleDelete = (id) => { if (confirm("Delete item?")) dispatch(deleteJewelry(id)); };

  return (
    // <div style={{ padding: 20 }}>
    <div className="text-center p-20 ">
      <h2>Manage Jewelry</h2>
        
      <form onSubmit={handleSubmit} className=" mb-12">
        <input className="m-1" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        {/* <input className="m-1" name="type" placeholder="Type (Ring, Necklace)" value={form.type} onChange={handleChange} required /> */}
         <select name="type" value={form.type} onChange={handleChange}>
            <option value="" >Types</option>
            <option value="Necklace" >Necklace</option>
            <option value="Ring" >Ring</option>
            <option value="Bengals" >Bengals</option>
            <option value="Fancy" >Fancy</option>
            <option value="Other" >Other</option>
        </select>
        <input className="m-1" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button className="btn btn-sm btn-primary " type="submit">{editing ? "Update" : "Add"}</button>
        {
        editing && 
        <button type="button" onClick={() => { setEditing(false); setForm({ id: null, name: "", type: "", price: "" }); }}>
        Cancel
        </button>}
      </form>
    {status === "loading" ? <p>Loading jewelry...</p> : <JewelryList items={jewelry || []} onEdit={handleEdit} onDelete={handleDelete} />}
    
    
    
    <button onClick={() => navigate("/dashboard")}style={{
          marginBottom: "15px",
          padding: "10px 15px",
          border: "none",
          borderRadius: "6px",
          background: "teal",
          color: "white",
          cursor: "pointer"
        }}>
        ← Back to Dashboard
      </button>
      <Deposits/>
    </div>
  );
};

export default Jewelry;
