import React from "react";

export type ClientType = {
  socketId: number;
  username: string;
  avatar: string;
};

export const Client = ({ socketId, avatar, username }: ClientType) => {
  return (
    <div
      key={socketId}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        width: "80px",
        height: "80px",
        margin: "0 auto",
      }}
    >
      <span style={{ fontSize: "2rem" }}>{avatar}</span>
      <span style={{ fontSize: "0.9rem", marginTop: "6px" }}>{username}</span>
    </div>
  );
};

export default Client;
