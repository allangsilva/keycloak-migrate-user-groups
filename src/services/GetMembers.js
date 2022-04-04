import axios from 'axios'
import appConfig from '../config/app.js';  

export default class GetMembers {
  constructor(token) {
    this.token = token
  }
  async execute({ groupId }) {
    try {

        const res = await axios.get(`${appConfig.keycloak.origin.host}/auth/admin/realms/vpm/groups/${groupId}/members`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log('[GROUPS-MEMBERS]', error)
    }
}
}
