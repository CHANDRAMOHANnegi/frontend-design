import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const JoinRoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");

  const router = useRouter();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("New room created with ID: " + id, {
      duration: 3000,
      position: "top-right",
    });
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId || !userId) {
      toast.error("Please enter both Room ID and User ID", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    router.push(`/room/${roomId}?user=${userId}`);

    // Logic to join the room can be added here
    toast.success(`User ${userId} joined room ${roomId}`, {
      duration: 3000,
      position: "top-right",
    });
  };
  // Handle form submission

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Home</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="roomId"
          >
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Room ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="userId"
          >
            User ID
          </label>
          <input
            type="text"
            id="userId"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter User ID"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={joinRoom}
        >
          Join Room
        </button>
        <span className="">If you dont have a room, you can create one</span>
        <button
          className="text-blue-500 hover:underline"
          onClick={createNewRoom}
        >
          Create New Room
        </button>
      </form>
    </div>
  );
};
