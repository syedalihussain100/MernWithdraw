import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/features/user/UserSlice';
import logo from "./logo.png";
import MyStyle from "./My.module.css";
import { ImProfile } from "react-icons/im";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { BiDollarCircle } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const MyHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
    localStorage.clear("user")
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }
  return (
    <div className={MyStyle.container}>
        <h2 className={MyStyle.textlogo}>Watch Ads</h2>
      {/* part 1 */}
      <div className={MyStyle.box_container}>
        <div className={MyStyle.mainContainerBox}>
          <div className={MyStyle.box1}>
            <div onClick={() => navigate("/profile")}>
              <ImProfile style={{ color: "#fff" }} className={MyStyle.icon} />
              <p>PROFILE</p>
            </div>
          </div>
          <div className={MyStyle.box2}>
            <div onClick={() => navigate("/video")}>
              <TbPlayerPlayFilled style={{ color: "#fff" }} className={MyStyle.icon} />
              <p>WATCH ROOM</p>
            </div>
          </div>
        </div>
        {/* part 2 */}
        <div className={MyStyle.mainContainerBox}>
          <div className={MyStyle.box1}>
            <div onClick={() => navigate("/wallet")}>
              <BiDollarCircle style={{ color: "#fff" }} className={MyStyle.icon} />
              <p>WALLET</p>
            </div>
          </div>
          <div className={MyStyle.box2}>
            <div onClick={() => navigate("/team")}>
              <AiOutlineTeam style={{ color: "#fff" }} className={MyStyle.icon} />
              <p>TEAM</p>
            </div>
          </div>
        </div>

        {/* part 3 */}
        <div className={MyStyle.mainContainerBox}>
          <div className={MyStyle.box1} onClick={()=> navigate("/invite")}>  <div>
            <BsFillShareFill style={{ color: "#fff" }} className={MyStyle.icon} />
            <p>INVITE</p>
          </div></div>
          <div className={MyStyle.box2} onClick={handleLogout}>  <div>
            <RiLogoutCircleRLine style={{ color: "#fff" }} className={MyStyle.icon} />
            <p>LOGOUT</p>
          </div></div>
        </div>
      </div>
    </div>
  )
}

export default MyHome