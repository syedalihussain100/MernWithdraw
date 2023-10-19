import React, { useEffect } from "react";
import WalletStyle from "./wallet.module.css";
import logo from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../redux/features/user/UserSlice";
import { useNavigate } from "react-router-dom";
import { getWithdraw } from "../../redux/features/Withdraw/withdrawSlice";

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWithdraw());
  }, [dispatch]);

  const userData = useSelector((state) => state?.auth?.getProfile);
  const { isLoading } = useSelector((state) => state?.auth);

  const data= useSelector(state => state?.withdraw);
 console.log(data?.getwithdraw?.length);
  return (
    <div className={WalletStyle.container}>
          <h2 className={WalletStyle.textlogo}>Watch Ads</h2>

      {isLoading ? (
        <h1 style={{ color: "#fff" }}>Loading...</h1>
      ) : (
        <>
          <div className={WalletStyle.box1}>
            <p>Current Balance: {userData && userData?.wallet}</p>
          </div>
          <div className={WalletStyle.box1}>
            <p>Total Earning: {userData && userData?.wallet}</p>
          </div>
          <div className={WalletStyle.box1}>
            <p>Watch Earning: {userData && userData?.wallet}</p>
          </div>
          <div className={WalletStyle.box1}>
            <p>Total Withdraw: 0</p>
          </div>
          <button
            onClick={() => navigate("/withdraw")}
            className={WalletStyle.btn}
          >
            Withdraw
          </button>

          <div className={WalletStyle.lineContainer}>
            <div>
              <p>With Draw</p>
              <p>Amount</p>
            </div>
            <div>
              <p>Withdraw</p>
              <p>Status</p>
            </div>
            <div>
              <p>Withdraw Time</p>
              <p>& Date</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
