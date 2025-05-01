import { ProfileDTO } from "../dtos/profileDTO";
import { server } from "./api";

const ProfileAPI = {
  updateProfile: async function (profileData: ProfileDTO, token: string) {
    try {
      const result = await server(token).post("/api/profile", profileData);
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },

  getProfile: async function (token: string) {
    try {
      const result = await server(token).get("/api/profile");
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },
};

export { ProfileAPI };
