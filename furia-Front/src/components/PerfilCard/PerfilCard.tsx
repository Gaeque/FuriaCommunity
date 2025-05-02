import { useAuth } from "../../hooks/UseAuth";
import "./PerfilCard.styles.css";

export function PerfilCard() {
  const { user } = useAuth();

  return (
    <div className="sidebar-left">
      <div className="floating-card">
        <div className="user-info">
          <div className="user-image">
            <span>Imagem</span>
          </div>
          <div className="user-name">{user?.userName}</div>
        </div>
      </div>
    </div>
  );
}
