import axios from "axios";
import qs from "qs";

export default class AuthKeycloak {
  constructor({ clientSecret, username, password, host, realm }) {
    this.clientSecret = clientSecret;
    this.username = username;
    this.password = password;
    this.host = host;
    this.realm = realm;
  }

  async execute() {
    const data = qs.stringify({
      client_id: "auth",
      grant_type: "password",
      client_secret: this.clientSecret,
      scope: "openid",
      username: this.username,
      password: this.password,
    });

    try {
      const res = await axios.post(
        `${this.host}/auth/realms/${this.realm}/protocol/openid-connect/token`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(`[AUTH ${this.host}] - Http response code ${res.status}`);
      return res.data;
    } catch (error) {
      console.log("[AUTH]", error);
    }
  }
}
