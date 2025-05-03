import "./Header.styles.css";
import furia from "../../assets/600px-FURIA_Esports_full_darkmode.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/UseAuth";

export function Header() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/signin");
  }

  return (
    <div className="container">
      <div className="left">
        <Button
          children="Sair"
          border="none"
          onClick={handleSignOut}
          className="logout-button"
        />
      </div>

      <div className="center">
        <Link to="/home">
          <Button children="Pagina Inicial" border="1px solid #fff" />
        </Link>

        <img
          src={furia}
          alt="Logo Fúria"
          className="img"
          width={70}
          height={70}
        />

        <Link to="/profile">
          <Button children="Perfil" border="1px solid #fff" />
        </Link>
      </div>

      <div className="right"></div>
    </div>
  );
}
