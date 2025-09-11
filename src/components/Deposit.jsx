// src/components/Deposit.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { depositAmount } from "../store/slices/walletSlice";

export default function Deposits() {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(s => s.auth.user); // current logged-in user

  const handleDeposit = () => {
    if (!amount || isNaN(amount)) {
      alert("Enter a valid amount");
      return;
    }
    dispatch(depositAmount({ userId: user.id, amount }));
    setAmount("");
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto shadow">
      <h2 className="text-xl font-semibold mb-2">Deposit Money</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleDeposit}
        className=""
      >
        Deposit
      </button>
    </div>
  );
}
