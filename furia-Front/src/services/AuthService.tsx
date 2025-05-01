import { server } from "./api";

const AuthAPI = {
  signIn: async function (data: { email: string; password: string }) {
    try {
      const { email, password } = data;
      const payload = {
        email,
        password,
      };

      const result = await server().post("/auth/login", payload);

      return result;
    } catch (e: any) {
      throw new Error(e.message);
    }
  },

  register: async function (data: {
    userName: string;
    email: string;
    password: string;
  }) {
    try {
      const { userName, email, password } = data;
      const payload = {
        userName,
        email,
        password,
      };
      console.log(payload);

      const result = await server().post("/auth/register", payload);
      return result;
    } catch (e: any) {
      throw Error(e.message);
    }
  },
};

export { AuthAPI };
