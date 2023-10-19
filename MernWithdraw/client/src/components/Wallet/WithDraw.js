import React, { useState } from 'react';
import withdrawStyle from "./withdraw.module.css";
import logo from "../User/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { createWithdraw } from "../../redux/features/Withdraw/withdrawSlice"


const WithDraw = () => {
  const data = useSelector(state => state?.auth?.getProfile);
  const [account, setAccount] = useState("");
  const [ammount, setAmmount] = useState(data?.wallet);
  const [accountType, setAccountType] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ammount === 700) {
      dispatch(createWithdraw({
        accountNumber: account,
        amountTitle: accountTitle,
        amount: ammount,
        accounttype: accountType
      }))
    } else {
      window.alert("Minimum 700 amount then you are withdraw")
    }
  }

  const {withData} = useSelector(state => state?.withdraw);
  return (
    <div className={withdrawStyle.container}>
       <h2 className={withdrawStyle.textlogo}>Watch Ads</h2>
      <h1 style={{color:"#fff"}}>{withData && withData}</h1>
      <div>
        <h3>Withdraw</h3>
        <div>
          <form className={withdrawStyle.formContainer}>
            <label>Acount Number</label>
            <input type='number' value={account} onChange={(e) => setAccount(e.target.value)} />
            <label>Acount Title</label>
            <input type="text" value={accountTitle} onChange={(e) => setAccountTitle(e.target.value)} />
            <label>Amount</label>
            <input type="text" value={ammount} />
            <label>Account Type</label>
            <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
              <option value="easypaisa">EasyPaisa</option>
              <option value="jazzcash">JazzCash</option>
            </select>
            <button className={withdrawStyle.btn} onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WithDraw