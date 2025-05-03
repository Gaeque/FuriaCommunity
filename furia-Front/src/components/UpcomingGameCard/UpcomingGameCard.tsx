import { useState, useEffect } from "react";
import furia from "../../assets/600px-FURIA_Esports_full_darkmode.png";
import "./UpcomingGameCard.styles.css";

interface UpcomingGameCardProps {
  games: { opponent: string; time: string; game: string }[];
}

export const UpcomingGameCard: React.FC<UpcomingGameCardProps> = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout; 

    if (!isHovered) {
      interval = setInterval(() => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
          setIsFading(false);
        }, 500);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [games.length, isHovered]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="upcoming-game-card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>Próximos Jogos</h3>
      <div className={`game-card ${isFading ? "fading" : ""}`}>
        <img src={furia} alt="Fúria Esports" className="game-logo" />
        <div className="game-info">
          <h4>Fúria x {games[currentIndex].opponent}</h4>
          <p>
            {games[currentIndex].game} - {games[currentIndex].time}
          </p>
        </div>

        <div className="game-dots">
          {games.map((_, index) => (
            <div
              key={index}
              className={`game-dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
