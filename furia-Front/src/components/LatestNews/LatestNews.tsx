import furia from "../../assets/600px-FURIA_Esports_full_darkmode.png";
import "./LatestNews.styles.css";

export const LatestNews: React.FC = () => {
  const news = [
    {
      id: 1,
      title: "Fúria vence mais uma partida incrível!",
      content: "Fúria acaba de derrotar a Team Liquid em uma série épica!",
    },
    {
      id: 2,
      title: "Fúria anuncia novos jogadores!",
      content:
        "Os novos membros da Fúria foram anunciados, e as expectativas são altas!",
    },
    {
      id: 3,
      title: "LoL Worlds 2025 começa amanhã!",
      content:
        "O maior campeonato de LoL está prestes a começar, e Fúria está pronta para lutar!",
    },
  ];

  return (
    <div className="latest-news-container">
      <div className="news">
        {news.map((item) => (
          <div key={item.id} className="news-item">
            <img
              src={furia}
              width="40px"
              alt="Furia Logo"
              className="news-image"
            />
            <div className="news-content">
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
