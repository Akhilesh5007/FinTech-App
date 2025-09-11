








import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJewelry, addJewelry, updateJewelry, deleteJewelry } from "../store/slices/jewelrySlice";
import JewelryList from "../components/JewelryList";
import { useNavigate } from "react-router-dom";

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
    const item = { ...form, userId: user.id, price: Number(form.price) };

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
    <div style={{ padding: 20 }}>
      <h2>Manage Jewelry</h2>
        
      <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="type" placeholder="Type (Ring, Necklace)" value={form.type} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">{editing ? "Update" : "Add"}</button>
        {editing && <button type="button" onClick={() => { setEditing(false); setForm({ id: null, name: "", type: "", price: "" }); }}>Cancel</button>}
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
    </div>
  );
};

export default Jewelry;
