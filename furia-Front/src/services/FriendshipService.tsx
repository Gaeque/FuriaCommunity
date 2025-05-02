import { server } from "./api";

const FriendshipAPI = {
  getPendingFriendRequest: async function (token: string) {
    try {
      const result = await server(token).get("/api/friends/getPendingRequests");
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },

  sendFriendRequest: async function (
    userName: string,
    friendUserName: string,
    token: string
  ) {
    try {
      const result = await server(token).post(
        `/api/friends/sendRequest?userName=${userName}&friendUserName=${friendUserName}`
      );
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },

  acceptFriendRequest: async function (
    userName: string,
    friendUserName: string,
    token: string
  ) {
    try {
      const result = await server(token).post(
        `/api/friends/acceptRequest?userName=${userName}&friendUserName=${friendUserName}`
      );
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },

  rejectFriendRequest: async function (
    userName: string,
    friendUserName: string,
    token: string
  ) {
    try {
      const result = await server(token).post(
        `/api/friends/rejectRequest?userName=${userName}&friendUserName=${friendUserName}`
      );
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },

  areFriends: async function (
    userName: string,
    friendUserName: string,
    token: string
  ) {
    try {
      const result = await server(token).get("/api/friendship/areFriends", {
        params: { userName, friendUserName },
      });
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },

  searchFriends: async function (userName: string, token: string) {
    try {
      const result = await server(token).get("/api/profile/search", {
        params: { userName: userName },
      });
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },

  getFriends: async function (token: string) {
    try {
      const result = await server(token).get("/api/friends/getFriends");
      return result;
    } catch (e: any) {
      console.log(e);
    }
  },
};

export { FriendshipAPI };
