"use client";
import { useState } from "react";
import { UserProfile } from "./user-profile";

// Demo component to test different scenarios
const App = () => {
    const [selectedUserId, setSelectedUserId] = useState('');

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Profile Loader</h1>

            <div className="mb-4">
                <label htmlFor="userId" className="block mb-2">Select User ID:</label>
                <select
                    id="userId"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">Choose a user...</option>
                    <option value="1">User 1 (Success)</option>
                    <option value="2">User 2 (Success)</option>
                    <option value="error">Error User (Throws error)</option>
                    <option value="notfound">Not Found User</option>
                </select>
            </div>

            <UserProfile userId={selectedUserId} />
        </div>
    );
};

export default App;