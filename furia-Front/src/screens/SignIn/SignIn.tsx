import React, { useState } from "react";
import { Input } from "../../components/Input/Input";
import "./SignIn.styles.css";
import furiaLogo from "../../assets/furiaLogo.png";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      setEmail("");
      setPassword("");
      setModalMessage("Usuário ou senha incorretos.");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <img src={furiaLogo} alt="Logo Fúria" className="img" width={100} />

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" children="Entrar" />
          <div className="signin-links">
            <a href="" className="forgot-password">
              Esqueceu sua senha?
            </a>
            <Link className="signup" to="/register">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modalMessage}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
