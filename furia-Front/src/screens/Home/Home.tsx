import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { UpcomingGameCard } from "../../components/UpcomingGameCard/UpcomingGameCard";
import { UserPosts } from "../../components/UserPost/UserPost";
import { LatestNews } from "../../components/LatestNews/LatestNews";
import "./Home.styles.css";

export function Home() {
  const [activeTab, setActiveTab] = useState<"posts" | "news">("posts");

  const upcomingGames = [
    { opponent: "Team Liquid", time: "20:00", game: "CS:GO" },
    { opponent: "Team Vitality", time: "22:00", game: "LoL" },
    { opponent: "G2 Esports", time: "18:00", game: "Valorant" },
  ];

  return (
    <div className="home-container">
      <Header />
      <div className="home-body">
        <div className="perfil-card-container"></div>
        <div className="main-content-container">
          <div className="main-content">
            <div className="subheader">
              <button
                className={activeTab === "posts" ? "active" : ""}
                onClick={() => setActiveTab("posts")}
              >
                Feed
              </button>
              <button
                className={activeTab === "news" ? "active" : ""}
                onClick={() => setActiveTab("news")}
              >
                Notícias
              </button>
            </div>
            {activeTab === "posts" ? <UserPosts /> : <LatestNews />}
          </div>
        </div>
        <div className="right-sidebar-container">
          <UpcomingGameCard games={upcomingGames} />
        </div>
      </div>
    </div>
  );
}
