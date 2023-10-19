import React, { useEffect } from 'react';
import VideoStyle from "./video.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFullVideos } from "../../redux/features/Home/HomeSlice";
import { Button } from '@chakra-ui/react';
import { UpdateWallet } from "../../redux/features/user/UserSlice";


const Video = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getFullVideos())
    }, [])

    const videodata = useSelector(state => state?.payment?.getVideos);
    const { message } = useSelector(state => state?.auth);
    const { isLoading } = useSelector(state => state?.payment);

    console.log(videodata)

    const handleClaim = (id) => {
        console.log(typeof (id));
        dispatch(UpdateWallet({ videoId: id }))
    }



    return (
        <div className={VideoStyle.container}>

            {
                isLoading ? <h2 style={{ textAlign: "center" }}>LOADING...</h2> : videodata?.data.map((elm, i) => (
                    videodata?.data?.length > 0 && <div className={VideoStyle.videoContainer}>
                        <video key={i} className={VideoStyle.video_container} controls>
                            <source src={elm?.video[0]?.url} type="video/mp4" />
                        </video>

                        <Button onClick={(id) => handleClaim(elm?._id)} className={VideoStyle?.btn}> Claim Reward</Button>

                    </div>
                ))
            }


        </div>
    )
}

export default Video