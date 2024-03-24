import React, { useState, useContext } from "react";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { AuthContext } from "../../components/Authentication";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const { isAuthenticated, user } = useContext();

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    if (!isAuthenticated || !user) {
      alert("User not authenticated");
      return;
    }

    const { uid, firstName, lastName } = user; // Destructure directly
    const displayName = `${firstName} ${lastName}`;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again."); // Provide user feedback
    }
  };

  return (
    <form onSubmit={sendMessage} className="send-message"> {/* Removed unnecessary arrow function */}
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
