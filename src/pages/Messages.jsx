import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { socket, connectSocket } from "../socket";
import axios from "axios";
import config from "../services/config";
import "../Styles/messages.css";
import { utils } from "../utils";

export default function Messages() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const candidateToken = state?.candidateToken;
  const user = state?.user;
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");

  const bottomRef = useRef(null);

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    connectSocket();
    loadHistory();

    socket.on("private_message", (msg) => {
      setMessages((prev) => [
        ...prev,
        { message: msg.message, incoming: true },
      ]);
      scrollToBottom();
    });

    return () => socket.off("private_message");
  }, []);

  const loadHistory = async () => {
    const token = sessionStorage.getItem("token");

    const res = await axios.post(
      `${config.BASE_URL}/chat/history`,
      { token: candidateToken },
      { headers: { token } }
    );

    setMessages(res.data.data || []);
    setTimeout(scrollToBottom, 150);
  };

  const sendMessage = () => {
    if (!inputMsg.trim()) return;

    socket.emit("private_message", {
      to_token: candidateToken,
      message: inputMsg,
    });

    setMessages((prev) => [
      ...prev,
      { message: inputMsg, incoming: false },
    ]);

    setInputMsg("");
    scrollToBottom();
  };

  return (
    <div className="chat-page m-5">

      {/* ------------ HEADER ---------------- */}
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate(-1)}>❮</button>

        <img
          src={utils.urlConverter(user.photo_url)}
          className="chat-header-dp"
        />

        <h4 className="chat-header-name">{user.user_name}</h4>
      </div>

      {/* ------------ CHAT BODY ---------------- */}
      <div className="chat-body">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble-row ${
              msg.incoming ? "incoming" : "outgoing"
            }`}
          >
            {msg.incoming && (
              <img
                src={utils.urlConverter(user.photo_url)}
                className="bubble-dp"
              />
            )}

            <div className="chat-bubble">{msg.message}</div>

            {!msg.incoming && (
              <img
                src={
                  utils.urlConverter(localStorage.getItem("sidebar_dp"))
                }
                className="bubble-dp"
              />
            )}
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* ------------ INPUT BOX ---------------- */}
      <div className="chat-input-area">
        <input
          className="chat-input"
          placeholder="Type a message..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
        />

        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}
