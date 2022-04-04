import axios from 'axios'
import appConfig from '../config/app.js';

export default class UpdateUserGroup {
  constructor(token) {
    this.token = token
  }
  async execute({ username, groupName }) {
      try {
        
        const user = await this.recoverUser(username);
        const group = await this.recoverGroup(groupName);

        const res = await axios.put(`${appConfig.keycloak.target.host}/auth/admin/realms/vpm/users/${user.id}/groups/${group.id}`, '', {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        return res.data;
    } catch (error) {
        console.log('[UPDATE-USER-GROUP]', error)
    }
  }
    
    async recoverUser(username) {
        const response = await axios.get(`${appConfig.keycloak.target.host}/auth/admin/realms/vpm/users?username=${username}`, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        return response.data?.length ? response.data[0] : null;
    }
    
    async recoverGroup(group) {
        const response = await axios.get(`${appConfig.keycloak.target.host}/auth/admin/realms/vpm/groups?search=${group}`, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        return response.data?.length ? response.data[0] : null;
    }
}
