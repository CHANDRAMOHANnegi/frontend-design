import React from "react";
import { JoinRoomForm } from "./join-room-form";

/***
 * make a form component
 *
 * make state for rooms and users
 * * 1. it should have a form to add a room
 * * 2. it should have a form to add a user
 *
 *  add tailwind css classes to the form
 *
 * **/

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home component!</p>
      {/* Add your form components here */}
      <JoinRoomForm />
    </div>
  );
};
export default Home;
