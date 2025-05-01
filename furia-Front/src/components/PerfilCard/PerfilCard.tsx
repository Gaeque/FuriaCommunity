import "./PerfilCard.styles.css";

export function PerfilCard() {
  return (
    <div className="sidebar-left">
      <div className="floating-card">
        <div className="user-info">
          <div className="user-image">
            <span>Imagem</span>
          </div>
          <div className="user-name">Gaeque Luan</div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
