import axios from "axios";
import appConfig from "../config/app.js";

export default class GetMembers {
  constructor(token) {
    this.token = token;
  }
  async execute({ groupId }) {
    try {
      const { host, realm } = appConfig.keycloak.origin;
      const res = await axios.get(
        `${host}/auth/admin/realms/${realm}/groups/${groupId}/members`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("[GROUPS-MEMBERS]", error);
    }
  }
}
