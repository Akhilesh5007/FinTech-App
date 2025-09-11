import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserById, logout } from "../store/slices/authSlice";
import { fetchWallet, depositAmount } from "../store/slices/walletSlice";
import { fetchTransactions } from "../store/slices/transactionsSlice";
import { fetchJewelry, deleteJewelry } from "../store/slices/jewelrySlice";
import JewelryList from "../components/JewelryList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status: authStatus } = useSelector((s) => s.auth);
  const { wallet, status: walletStatus } = useSelector((s) => s.wallet);
  const { transactions, status: txStatus } = useSelector((s) => s.transactions);
  const { jewelry, status: jewelryStatus } = useSelector((s) => s.jewelry);

  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");

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

  const handleAddMoney = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Enter valid amount");
      return;
    }
    dispatch(depositAmount({ userId: user.id, amount: Number(amount) }))
      .unwrap()
      .then(() => {
        alert("Amount added successfully!");
        setAmount("");
        setShowPopup(false);
      })
      .catch((err) => alert("Error: " + err));
  };

  if (!user && authStatus !== "succeeded") return <p>Loading user info...</p>;

  return (
    <div className="text-center">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5 className="text-center">Welcome, {user?.name}</h5>
        <div>
          <button className="me-1 btn btn-primary" onClick={() => navigate("/jewelry")}>
            Manage Jewelry
          </button>
          <button className=" m-1 btn btn-primary" onClick={() => navigate("/Home")}>
            Home
          </button>
          <button
            className="btn btn-primary m-1"
            onClick={handleLogout}
            
          >
            Logout
          </button>
        </div>
      </div>

      <section>
        <h3>Wallet</h3>
        {walletStatus === "loading" ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>Balance: ₹{wallet?.balance ?? 0}<button
              className=" ms-1 btn btn-sm btn-outline-success "
              onClick={() => setShowPopup(true)}
            >+</button></p>
            {/* <button
              className="btn btn-sm btn-success"
              onClick={() => setShowPopup(true)}
            >
              Add Money
            </button> */}
          </div>
        )}
      </section>

      <section>
        <h3>Recent Transactions</h3>
        {txStatus === "loading" ? (
          <p>Loading...</p>
        ) : transactions && transactions.length > 0 ? (
          <ul>
            {transactions.map((t) => (
              <li key={t.id}>
                {t.date} — {t.description} — ₹{t.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found.</p>
        )}
      </section>

      <section>
        <h3>Your Jewelry</h3>
        {jewelryStatus === "loading" ? (
          <p>Loading...</p>
        ) : (
          <JewelryList items={jewelry || []} onDelete={handleDelete} />
        )}
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              width: 300,
              textAlign: "center",
            }}
          >
            <h4>Add Money</h4>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              style={{ width: "100%", marginBottom: 10 }}
            />
            <div>
              <button className="btn btn-sm btn-success" onClick={handleAddMoney}>
                Add
              </button>
              <button
                className="btn btn-sm btn-danger "
                onClick={() => setShowPopup(false)}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;










// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchUserById, logout } from "../store/slices/authSlice";
// import { fetchWallet } from "../store/slices/walletSlice";
// import { fetchTransactions } from "../store/slices/transactionsSlice";
// import { fetchJewelry, deleteJewelry } from "../store/slices/jewelrySlice";
// import JewelryList from "../components/JewelryList";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, status: authStatus } = useSelector(s => s.auth);
//   const { wallet, status: walletStatus } = useSelector(s => s.wallet);
//   const { transactions, status: txStatus } = useSelector(s => s.transactions);
//   const { jewelry, status: jewelryStatus } = useSelector(s => s.jewelry);

//   useEffect(() => {
//     if (user?.id) {
//       dispatch(fetchUserById(user.id));
//       dispatch(fetchWallet(user.id));
//       dispatch(fetchTransactions(user.id));
//       dispatch(fetchJewelry(user.id));
//     }
//   }, [dispatch, user?.id]);

//   const handleDelete = (id) => {
//     if (!id) return;
//     if (confirm("Delete this item?")) dispatch(deleteJewelry(id));
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   if (!user && authStatus !== "succeeded") return <p>Loading user info...</p>;

//   return (
//     // style={{ padding: 20 }}
//     <div className="text-center">
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h1 className="text-center">Welcome, {user?.name}</h1>
//         <div>
//           <button className="btn btn-primary" onClick={() => navigate("/jewelry")}>Manage Jewelry</button>
//           <button className="btn btn-primary" onClick={handleLogout} style={{ marginLeft: 8 }}>Logout</button>
//         </div>
//       </div>

//       <section>
//         <h3>Wallet</h3>
//         {walletStatus === "loading" ? <p>Loading...</p> : <p>Balance: ₹{wallet?.balance ?? 0}</p>}
//       </section>

//       <section>
//         <h3>Recent Transactions</h3>
//         {txStatus === "loading" ? <p>Loading...</p> : (transactions && transactions.length > 0 ? (
//           <ul>{transactions.map(t => <li key={t.id}>{t.date} — {t.description} — ₹{t.amount}</li>)}</ul>
//         ) : <p>No transactions found.</p>)}
//       </section>

//       <section>
//         <h3>Your Jewelry</h3>
//         {jewelryStatus === "loading" ? <p>Loading...</p> : <JewelryList items={jewelry || []} onDelete={handleDelete} />}
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
