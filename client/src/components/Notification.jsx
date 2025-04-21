import React from "react";

const Notification = ({ color, message, fn }) => {
  return (
    <div
      style={{
        background: color,
      }}
      className={message ? `flex justify-between p-2 rounded-md my-2` : "hidden"}
    >
      <p className="text-black">{message}</p>
      <button onClick={fn}>❌</button>
    </div>
  );
};

export default Notification;
