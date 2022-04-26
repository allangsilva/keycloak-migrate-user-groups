import axios from "axios";
import appConfig from "../config/app.js";

export default class ListGroups {
  async execute(token) {
    try {
      const { host, realm } = appConfig.keycloak.origin;
      const res = await axios.get(`${host}/auth/admin/realms/${realm}/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`[GROUPS] - Http response code ${res.status}`);
      return res.data;
    } catch (error) {
      console.log("[GROUPS]", error);
    }
  }
}
