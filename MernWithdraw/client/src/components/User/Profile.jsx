import React, { useEffect } from "react";
import ProfileStyle from "./Profile.module.css";
import { Card } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../redux/features/user/UserSlice";
import { BiUserCircle } from "react-icons/bi";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProfile());
  }, [dispatch]);

  const profile = useSelector((state) => state?.auth?.getProfile);
  const { isLoading } = useSelector((state) => state?.auth);
  console.log(profile);

  return (
    <div className={ProfileStyle.container}>
      {isLoading ? (
        <h1>LOADING...</h1>
      ) : (
        <Card className={ProfileStyle.card}>
          <BiUserCircle className={ProfileStyle.icon} />
          <div className={ProfileStyle.profile}>
            <h3>
              <span>User Name:</span> {profile && profile.username}
            </h3>
            <h3>
              <span>Email:</span> {profile && profile.email}
            </h3>
            <h3>
              <span>Phone:</span> {profile && profile.phone}
            </h3>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Profile;
