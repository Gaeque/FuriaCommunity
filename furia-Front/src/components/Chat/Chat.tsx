import React, { useState, useEffect } from "react";
import "./Chat.styles.css";
import { FriendshipAPI } from "../../services/FriendshipService";
import { useAuth } from "../../hooks/UseAuth";

const friendsList = [
  { id: 1, name: "Amigo 1" },
  { id: 2, name: "Amigo 2" },
  { id: 3, name: "Amigo 3" },
  { id: 4, name: "Amigo 4" },
];

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
  const { user } = useAuth();

  const toggleChat = () => {
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

  const acceptFriendRequest = (id: number) => {
    console.log(`Aceitando solicitação de amizade do ID: ${id}`);
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  };

  const rejectFriendRequest = (id: number) => {
    console.log(`Rejeitando solicitação de amizade do ID: ${id}`);
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  };

  useEffect(() => {
    handleGetPendingRequests();
  }, []);

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
                      {friendsList.map((friend) => (
                        <div
                          key={friend.id}
                          className="friend-item"
                          onClick={() => selectFriend(friend.id)}
                        >
                          {friend.name}
                        </div>
                      ))}
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
                              onClick={() => acceptFriendRequest(request.id)}
                            >
                              ✅
                            </span>
                            <span
                              className="reject-btn"
                              onClick={() => rejectFriendRequest(request.id)}
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
              Chat com{" "}
              {friendsList.find((friend) => friend.id === selectedFriend)?.name}
            </h4>
            <span className="close-chat-btn" onClick={closeChat}>
              ❌
            </span>
          </div>

          <div className="chat-messages">
            <p>
              <strong>Amigo:</strong> Olá, tudo bem?
            </p>
            <p>
              <strong>Você:</strong> Tudo sim, e você?
            </p>
          </div>

          <div className="chat-input-area">
            <textarea
              placeholder="Digite sua mensagem..."
              className="chat-input"
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
              <button className="send-button">Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
