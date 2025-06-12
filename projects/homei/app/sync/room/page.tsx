"use client";

import { useState } from "react";
import { Client, ClientType } from "../components/client";
import { Editor } from "../components/editor";

const users: ClientType[] = [
  { socketId: 1, username: "Alice", avatar: "🧑‍🦰" },
  { socketId: 2, username: "Bob", avatar: "🧑‍🦱" },
  { socketId: 3, username: "Charlie", avatar: "🧑‍🦳" },
];

export const Room = () => {
  const [clients, setClient] = useState<ClientType[]>(users);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "220px",
          background: "#f5f5f5",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h3 style={{ margin: 0, marginBottom: "12px" }}>Users</h3>
        {clients.map((client) => (
          <Client {...client} key={client.socketId} />
        ))}

        <button>Copy room id</button>
        <button>Leave room</button>
      </aside>

      <main style={{ flex: 1, padding: "32px" }}>
        <h2>Room Main Section</h2>
        <Editor />
        {/* Add your main room content here */}
      </main>
    </div>
  );
};

export default Room;
