import React, { useState } from "react";
import { Input } from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import "./Register.styles.css";
import furiaLogo from "../../assets/furiaLogo.png";
import Button from "../../components/Button/Button";
import { AuthAPI } from "../../services/AuthService";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const Register = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);

    try {
      await AuthAPI.register({ userName, email, password });
      setModalMessage("Conta criada com sucesso!");
      setShowModal(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.log(error);
      setModalMessage("Email já cadastrado.");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <img src={furiaLogo} alt="Logo Fúria" className="img" width={100} />
        <form onSubmit={Register}>
          <Input
            type="Nome"
            placeholder="Digite seu nick"
            value={userName}
            onChange={handleUserNameChange}
          />
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
          <Button type="submit" children="Criar conta" />
          <div className="back-login-container">
            <Link className="back-login" to="/signin">
              Já tem uma conta? Faça login
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
