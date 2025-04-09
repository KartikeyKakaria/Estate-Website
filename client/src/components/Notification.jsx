import React from "react";

const Notification = ({ color, message, fn }) => {
  return (
    <div
      className={
        message ? `flex justify-between p-2 bg-${color}-200 rounded-md` : "hidden"
      }
    >
      <p className="text-black">{message}</p>
      <button onClick={fn}>❌</button>
    </div>
  );
};

export default Notification;
