import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserById, logout } from "../store/slices/authSlice";
import { fetchWallet } from "../store/slices/walletSlice";
import { fetchTransactions } from "../store/slices/transactionsSlice";
import { fetchJewelry, deleteJewelry } from "../store/slices/jewelrySlice";
import JewelryList from "../components/JewelryList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status: authStatus } = useSelector(s => s.auth);
  const { wallet, status: walletStatus } = useSelector(s => s.wallet);
  const { transactions, status: txStatus } = useSelector(s => s.transactions);
  const { jewelry, status: jewelryStatus } = useSelector(s => s.jewelry);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserById(user.id));
      dispatch(fetchWallet(user.id));
      dispatch(fetchTransactions(user.id));
      dispatch(fetchJewelry(user.id));
    }
  }, [dispatch, user?.id]);

  const handleDelete = (id) => {
    if (!id) return;
    if (confirm("Delete this item?")) dispatch(deleteJewelry(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user && authStatus !== "succeeded") return <p>Loading user info...</p>;

  return (
    // style={{ padding: 20 }}
    <div className="text-center">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="text-center">Welcome, {user?.name}</h1>
        <div>
          <button className="btn btn-primary" onClick={() => navigate("/jewelry")}>Manage Jewelry</button>
          <button className="btn btn-primary" onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
        </div>
      </div>

      <section>
        <h3>Wallet</h3>
        {walletStatus === "loading" ? <p>Loading...</p> : <p>Balance: ₹{wallet?.balance ?? 0}</p>}
      </section>

      <section>
        <h3>Recent Transactions</h3>
        {txStatus === "loading" ? <p>Loading...</p> : (transactions && transactions.length > 0 ? (
          <ul>{transactions.map(t => <li key={t.id}>{t.date} — {t.description} — ₹{t.amount}</li>)}</ul>
        ) : <p>No transactions found.</p>)}
      </section>

      <section>
        <h3>Your Jewelry</h3>
        {jewelryStatus === "loading" ? <p>Loading...</p> : <JewelryList items={jewelry || []} onDelete={handleDelete} />}
      </section>
    </div>
  );
};

export default Dashboard;
