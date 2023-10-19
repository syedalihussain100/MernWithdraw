import React, { useState, useEffect } from 'react';
import HomeStyle from "./Home.module.css";
import logo from "./logo.png";
import { useDispatch, useSelector } from 'react-redux';
import {
    Input,
    Button,
} from '@chakra-ui/react'
import { paymentForm } from "../../redux/features/Home/HomeSlice"
import { UserActive, logoutUser } from "../../redux/features/user/UserSlice";
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const data = useSelector(state => state?.auth?.user);
    const paymentdata = useSelector(state => state?.payment);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [sender, setSender] = useState("")
    const [image, setImage] = useState(null);



    useEffect(() => {
        dispatch(UserActive())
    }, [dispatch])


    const active = useSelector(state => state?.auth?.activeUser);




    active?.data.find((elm) => {
        if (elm?.superrole) {
            navigate("/home")
        }
    })





    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    const handleLogout = () => {
        dispatch(logoutUser())
        localStorage.clear("user");
        navigate("/login")
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("trxid", id);
        formData.append("user", data?._id);
        formData.append("sender", sender);
        formData.append("image", image);

        dispatch(paymentForm(formData))
    }

   
    return (
        <div className={HomeStyle.container}>
            <h2 className={HomeStyle.textlogo}>Watch Ads</h2>
            <h1 className={HomeStyle.alert}>{paymentdata && paymentdata?.message}</h1>
            <div className={HomeStyle.container_box}>
                <p>Watch Ads is a website where you can earn money by watching Ads. Here you can earn upto Rs.1500 in a day. To join this website pay the fee of Rs. 600 in the easypaisa account below. You must put the TRx Id and sender's mobile number/account number below after sending the fees.JOIN NOW AND START EARNING TODAY!</p>
            </div>
            {/* second */}
            <div className={HomeStyle.container_box1}>
                <div className={HomeStyle.easy}>EasyPaisa</div>
                <p>Account Name : Batool Yaseen</p>
                <p>Account Number : 03267520252</p>
            </div>
            {/* form */}
            <div className={HomeStyle.form_container}>
                <p>Payment Detail</p>
                <form onSubmit={handleSubmit}>
                    <Input className={HomeStyle.in} type='text' placeholder='Trx ID' value={id} onChange={(e) => setId(e.target.value)} />
                    <Input className={HomeStyle.in} value={sender} type='number' placeholder='Sender No' onChange={(e) => setSender(e.target.value)} />
                    <Input type="file" onChange={handleImageChange} />
                    <Button type='submit' className={HomeStyle.btn} mt="4">
                        Submit
                    </Button>
                </form>

            </div>

            {/* logout here */}

            <Button className={HomeStyle.lgbtn} onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Home