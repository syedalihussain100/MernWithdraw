import React, { useState, useEffect } from "react";
import InviteStyle from "./Invite.module.css";
import { FcInvite } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { createinvite } from "../../redux/features/Invite/InviteSlice";

const Invite = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(createinvite());
  };

  const data1 = useSelector((state) => state?.invite?.inviteData);
  const { isLoading } = useSelector((state) => state?.invite);
  console.log(data1);

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsCopied(false); // Reset isCopied when data1 changes
  }, [data1]);

  const copyToClipboard = () => {
    const inviteLink = data1?.inviteLink;
    if (inviteLink) {
      // Create a temporary textarea element
      const textArea = document.createElement("textarea");
      textArea.value = inviteLink;

      // Append the textarea to the DOM
      document.body.appendChild(textArea);

      // Select the text inside the textarea
      textArea.select();

      // Execute the copy command
      document.execCommand("copy");

      // Remove the textarea from the DOM
      document.body.removeChild(textArea);

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className={InviteStyle.container}>
      <div className={InviteStyle.main_container} onClick={handleClick}>
        <h2>Invite: </h2>
        <FcInvite className={InviteStyle.icon} />
      </div>
      {isLoading ? (
        <h3 style={{ color: "#fff", fontSize: "2rem", textAlign: "center" }}>
          LOADING...
        </h3>
      ) : (
        <>
          <h2 style={{ color: "#fff" }}>
            {data1 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Invite Link: {data1?.inviteLink}
                <button
                  style={{ color: "#fff", fontSize: "1.5rem" }}
                  onClick={copyToClipboard}
                >
                  Copy Invite Link
                </button>
              </div>
            ) : null}
          </h2>
          {isCopied ? (
            <p style={{ color: "#fff" }}>Copied to clipboard!</p>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Invite;
