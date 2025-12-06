    import React, { useState } from "react";
    import "../Styles/Message.css";


    const Message = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const chatUsers = [
        { id: 1, name: "Rishabh", lastMessage: "Hey! How are you?" },
        { id: 2, name: "Chaitanya", lastMessage: "Let's meet tomorrow!" },
        { id: 3, name: "Neha", lastMessage: "Send me your photo 😄" },
    ];
    const messages = [
        { from: "them", text: "Hii 😊" },
        { from: "me", text: "Hello!" },
        { from: "them", text: "How's your day?" },
        { from: "me", text: "Pretty good, just busy!" },
    ];
    
    return (
        <div className="message-container">
        <div className="chat-list">
            <h2 className="title">Messages</h2>
            {chatUsers.map((user) => (
            <div
                key={user.id}
                className={`chat-user ${selectedChat === user.id ? "active" : ""}`}
                onClick={() => setSelectedChat(user.id)}
            >
                <div className="chat-avatar">{user.name.charAt(0)}</div>
                <div>
                <h4>{user.name}</h4>
                <p className="last-msg">{user.lastMessage}</p>
                </div>
            </div>
            ))}
        </div>
        <div className="chat-box">
            {!selectedChat ? (
            <div className="empty-chat">
                <h3>Select a conversation</h3>
                <p>Your messages will appear here.</p>
            </div>
            ) : (
            <>
                <div className="chat-header">
                <h3>
                    {chatUsers.find((u) => u.id === selectedChat)?.name}
                </h3>
                </div>
                <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div
                    key={i}
                    className={`message-bubble ${msg.from === "me" ? "me" : "them"}`}
                    >
                    {msg.text}
                    </div>
                ))}
                </div>
                <div className="chat-input-area">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="chat-input"
                />
                <button className="send-btn">Send</button>
                </div>
            </>
            )}
        </div>
        </div>
    );
    };


    export default Message;
