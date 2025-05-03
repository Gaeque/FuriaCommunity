import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import "./Profile.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import gamersclub from "../../assets/gamersclub.png";
import instagram from "../../assets/instagram.png";
import twitch from "../../assets/twitch.png";
import furia from "../../assets/600px-FURIA_Esports_full_darkmode.png";
import { Input } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ProfileAPI } from "../../services/ProfileService";
import { ProfileDTO } from "../../dtos/profileDTO";
import { useAuth } from "../../hooks/UseAuth";

export function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(furia);
  const [userName, setUserName] = useState("Seu nome");
  const [bio, setBio] = useState("Sua descrição");
  const [phone, setPhone] = useState("");
  const [instagramUser, setInstagramUser] = useState("instagram.com");
  const [gamersClubUser, setGamersClubUser] = useState("gamersclub.com");
  const [twitchUser, setTwitchUser] = useState("twitch.com");
  const { user } = useAuth();
  const [birthDate, setBirthDate] = useState("");
  const [, setProfile] = useState<ProfileDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = user?.token;
        if (!token) {
          console.log("Token de autenticação ausente.");
          return;
        }
        const response = await ProfileAPI.getProfile(token);
        const profileData: ProfileDTO = response?.data;

        if (profileData) {
          setProfile(profileData);
          setUserName(profileData.userName || "");
          setBio(profileData.bio || "");
          setPhone(profileData.phone || "");
          setInstagramUser(profileData.instagram || "");
          setGamersClubUser(profileData.gamersClub || "");
          setTwitchUser(profileData.twitch || "");
          setBirthDate(profileData.birthDate || "");
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleUpdateProfile() {
    try {
      const token = user?.token;
      if (!token) {
        console.log("Token de autenticação ausente.");
        return;
      }
      const payload: ProfileDTO = {
        userName,
        bio,
        phone,
        birthDate,
        instagram: instagramUser || null,
        gamersClub: gamersClubUser || null,
        twitch: twitchUser || null,
      };

      const result = await ProfileAPI.updateProfile(payload, token);
      console.log("Perfil atualizado com sucesso!", result);
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  }

  if (loading) {
    return (
      <div className="profile-container">
        <Header />
        <div className="loading">Carregando perfil...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Header />

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-card">
            <div
              className="profile-photo"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <img src={profileImage} alt="Profile" className="profile-image" />
              <FontAwesomeIcon
                icon={faPen}
                className="edit-icon"
                onClick={() => document.getElementById("file-input")?.click()}
              />
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <div className="profile-info">
              <div className="profile-info-inputs">
                {editMode ? (
                  <Input
                    type="text"
                    color="#fff"
                    backgroundColor="#1d1d1d"
                    placeholder={userName}
                    value={userName}
                    size={{ width: "8.75rem", height: "0.875rem" }}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                ) : (
                  <h2>{userName}</h2>
                )}
              </div>
              <div className="profile-info-inputs">
                {editMode ? (
                  <textarea
                    placeholder={bio}
                    className="bio-textarea"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                ) : (
                  <p>{bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right">
          <div className="personal-info-card">
            <div className="personal-info-section">
              <h1>Informações pessoais</h1>

              <div className="personal-info-inputs">
                <p>Celular</p>
                <Input
                  type="text"
                  color="#fff"
                  backgroundColor="#1d1d1d"
                  placeholder="Celular"
                  value={phone}
                  size={{ width: "8.75rem", height: "0.875rem" }}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!editMode}
                />
              </div>
              <div className="personal-info-inputs">
                <p>Data de Nascimento</p>
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  disabled={!editMode}
                  backgroundColor="#1d1d1d"
                  color="#fff"
                  size={{ width: "8.75rem", height: "0.875rem" }}
                />
              </div>
            </div>

            <div className="socials-info-section">
              <h1>Redes Sociais e Games</h1>
              <div className="socials-info-inputs">
                <img
                  src={instagram}
                  width={"28px"}
                  alt="Instagram"
                  className="social-icon"
                />
                <Input
                  type="text"
                  color="#fff"
                  backgroundColor="#1d1d1d"
                  value={instagramUser}
                  size={{ width: "8.75rem", height: "0.875rem" }}
                  onChange={(e) => setInstagramUser(e.target.value)}
                  disabled={!editMode}
                />
              </div>

              <div className="socials-info-inputs">
                <img
                  src={gamersclub}
                  width={"28px"}
                  alt="gamersclub"
                  className="social-icon"
                />
                <Input
                  type="text"
                  color="#fff"
                  backgroundColor="#1d1d1d"
                  value={gamersClubUser}
                  size={{ width: "8.75rem", height: "0.875rem" }}
                  onChange={(e) => setGamersClubUser(e.target.value)}
                  disabled={!editMode}
                />
              </div>

              <div className="socials-info-inputs">
                <img
                  src={twitch}
                  width={"28px"}
                  alt="Twitch"
                  className="social-icon"
                />
                <Input
                  type="text"
                  color="#fff"
                  backgroundColor="#1d1d1d"
                  value={twitchUser}
                  size={{ width: "8.75rem", height: "0.875rem" }}
                  onChange={(e) => setTwitchUser(e.target.value)}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="edit-button-container">
        <Button
          className={`edit-Button ${
            editMode ? "edit-button-save" : "edit-button-edit"
          }`}
          onClick={() => {
            if (editMode) {
              handleUpdateProfile();
            }
            setEditMode(!editMode);
          }}
        >
          {editMode ? "Salvar" : "Editar"}
        </Button>
      </div>
    </div>
  );
}
