import React, { useState, useEffect } from "react";
import "./Chat.styles.css";
import { FriendshipAPI } from "../../services/FriendshipService";
import { useAuth } from "../../hooks/UseAuth";
import { WebSocketService } from "../../services/WebSocketService";

type FriendRequest = {
  id: number;
  userName: string;
};

const Chat: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"friends" | "requests">("friends");
  const [friends, setFriends] = useState<FriendRequest[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >([]);
  const [wsService, setWsService] = useState<WebSocketService | null>(null);
  const { user } = useAuth();

  const toggleChat = () => {
    getFriends();
    setIsChatOpen((prev) => {
      const newState = !prev;
      if (!newState) {
        setSelectedFriend(null);
        setIsFriendsListOpen(false);
        setSearchTerm("");
        setSearchResults("");
      } else {
        setIsFriendsListOpen(true);
      }
      return newState;
    });
  };

  const [requestSent, setRequestSent] = useState(false);

  const selectFriend = (id: number) => {
    setSelectedFriend(id);
  };

  const closeChat = () => {
    setSelectedFriend(null);
  };

  async function getFriends() {
    try {
      const token = user?.token;
      if (!token) {
        console.log("Token de autenticação ausente.");
        return;
      }

      const result = await FriendshipAPI.getFriends(token);
      console.log(result?.data);
      if (result?.data) {
        setFriends(result.data);
      } else {
        setFriends([]);
      }
    } catch (error) {
      console.log("Erro ao buscar solicitações:", error);
    }
  }

  async function handleSearchFriends(term: string) {
    try {
      const token = user?.token;
      if (!token) {
        console.log("Token de autenticação ausente.");
        return;
      }

      const result = await FriendshipAPI.searchFriends(term, token);
      if (result?.data) {
        setSearchResults(result.data);
      } else {
        setSearchResults("");
      }
    } catch (error) {
      console.log(error);
      setSearchResults("");
    }
  }

  async function handleSendRequestFriend(friendUserName: string) {
    try {
      const token = user?.token;
      const userName = user?.userName;
      if (!token || !userName) {
        console.log("Token ou userName ausente.");
        return;
      }

      const result = await FriendshipAPI.sendFriendRequest(
        userName,
        friendUserName,
        token
      );

      if (result?.status === 200) {
        console.log("Solicitação de amizade enviada com sucesso!");
        setRequestSent(true); // Marca como enviada
      } else {
        console.log("Erro ao enviar solicitação de amizade.");
      }
    } catch (error) {
      console.log("Erro ao enviar solicitação:", error);
    }
  }

  async function handleGetPendingRequests() {
    try {
      const token = user?.token;
      if (!token) {
        console.log("Token de autenticação ausente.");
        return;
      }

      const result = await FriendshipAPI.getPendingFriendRequest(token);
      console.log(result);
      if (result?.data) {
        setFriendRequests(result.data);
      } else {
        setFriendRequests([]);
      }
    } catch (error) {
      console.log("Erro ao buscar solicitações:", error);
    }
  }

  async function handleAcceptFriendRequest(friendUserName: string) {
    try {
      const token = user?.token;
      const userName = user?.userName;

      if (!token || !userName) {
        console.log("Token ou userName ausente.");
        return;
      }

      const result = await FriendshipAPI.acceptFriendRequest(
        userName,
        friendUserName,
        token
      );

      console.log("Solicitação aceita:", result?.status);

      setFriendRequests((prev) =>
        prev.filter((req) => req.userName !== friendUserName)
      );

      getFriends();
    } catch (error) {
      console.log("Erro ao aceitar amizade:", error);
    }
  }

  async function handleRejectFriendRequest(friendUserName: string) {
    try {
      const token = user?.token;
      const userName = user?.userName;

      if (!token || !userName) {
        console.log("Token ou userName ausente.");
        return;
      }

      const result = await FriendshipAPI.rejectFriendRequest(
        userName,
        friendUserName,
        token
      );

      console.log("Solicitação Recusada:", result);

      setFriendRequests((prev) =>
        prev.filter((req) => req.userName !== friendUserName)
      );
    } catch (error) {
      console.log("Erro ao aceitar amizade:", error);
    }
  }
  if (!wsService) {
    console.log("WebSocketService não está instanciado!");
  }
  const handleSendMessage = () => {
    if (!wsService || !user?.userName || !selectedFriend) return;

    const newMessage = {
      sender: user.userName,
      receiverId: selectedFriend,
      content: message,
    };
    console.log("Enviando mensagem:");
    console.log("Sender:", user?.userName);
    console.log("Receiver ID:", selectedFriend);
    console.log("Conteúdo:", message);
    wsService.sendMessage(newMessage);
    setMessages((prev) => [
      ...prev,
      { sender: user.userName, content: message },
    ]);
    setMessage("");
  };

  useEffect(() => {
    handleGetPendingRequests();
  }, []);

  useEffect(() => {
    if (!user?.token) return;

    const ws = new WebSocketService();
    ws.connect(user.token);

    ws.onMessage((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    setWsService(ws);
  }, [user]);

  useEffect(() => {
    if (activeTab === "requests") {
      handleGetPendingRequests();
    } else if (activeTab === "friends") {
      getFriends();
    }
  }, [activeTab]);

  return (
    <div className="chat-container">
      <div className="chat-icon" onClick={toggleChat}>
        💬
      </div>

      {isChatOpen && (
        <div className="friends-list expanded">
          {isFriendsListOpen && (
            <>
              <div className="search-bar">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    if (value.trim() === "") {
                      setSearchResults("");
                    }
                  }}
                  placeholder="Buscar pessoas..."
                />
                <button
                  onClick={() => {
                    if (searchTerm.trim() !== "") {
                      handleSearchFriends(searchTerm);
                    }
                  }}
                  className="search-button"
                >
                  🔍
                </button>
              </div>

              {searchTerm === "" && (
                <>
                  <div className="tab-buttons">
                    <button
                      className={activeTab === "friends" ? "active" : ""}
                      onClick={() => setActiveTab("friends")}
                    >
                      Amigos
                    </button>
                    <button
                      className={activeTab === "requests" ? "active" : ""}
                      onClick={() => setActiveTab("requests")}
                    >
                      Solicitações
                    </button>
                  </div>

                  {activeTab === "friends" && (
                    <div className="friends-list-items">
                      {friends.length > 0 ? (
                        friends.map((friend) => (
                          <div
                            key={friend.id}
                            className="friend-item"
                            onClick={() => selectFriend(friend.id)}
                          >
                            {friend.userName}
                          </div>
                        ))
                      ) : (
                        <p>Você ainda não possui amigos.</p>
                      )}
                    </div>
                  )}

                  {activeTab === "requests" && (
                    <div className="friend-requests-section">
                      {friendRequests.length > 0 ? (
                        friendRequests.map((request) => (
                          <div key={request.id} className="friend-request-item">
                            {request.userName}
                            <span
                              className="accept-btn"
                              onClick={() =>
                                handleAcceptFriendRequest(request.userName)
                              }
                            >
                              ✅
                            </span>
                            <span
                              className="reject-btn"
                              onClick={() =>
                                handleRejectFriendRequest(request.userName)
                              }
                            >
                              ❌
                            </span>
                          </div>
                        ))
                      ) : (
                        <p>Sem solicitações de amizade.</p>
                      )}
                    </div>
                  )}
                </>
              )}

              {searchTerm !== "" && (
                <div className="search-results-list">
                  {searchResults ? (
                    <div className="friend-item">
                      {searchResults}
                      <button
                        className="add-friend-btn"
                        onClick={() => handleSendRequestFriend(searchResults)}
                        disabled={requestSent}
                      >
                        {requestSent ? "✅" : "➕"}
                      </button>
                    </div>
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        color: "#888",
                      }}
                    >
                      Nenhum usuário com esse nome.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {selectedFriend && (
        <div className="chat-box">
          <div className="chat-header">
            <h4>
              {friends.find((friend) => friend.id === selectedFriend)?.userName}
            </h4>
            <span className="close-chat-btn" onClick={closeChat}>
              ❌
            </span>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => {
              const isOwnMessage = msg.sender === user?.userName;
              return (
                <p
                  key={index}
                  className={isOwnMessage ? "own-message" : "friend-message"}
                >
                  <strong>{msg.sender}:</strong> {msg.content}
                </p>
              );
            })}
          </div>
          <div className="chat-input-area">
            <textarea
              placeholder="Digite sua mensagem..."
              className="chat-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="chat-actions">
              <label className="image-upload">
                📷
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </label>
              <button className="send-button" onClick={handleSendMessage}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
