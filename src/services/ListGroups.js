import axios from 'axios'
import appConfig from '../config/app.js';

export default class ListGroups {
  async execute(token) {
    try {

        const res = await axios.get(`${appConfig.keycloak.origin.host}/auth/admin/realms/vpm/groups`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(`[GROUPS] - Http response code ${res.status}`)
        return res.data;
    } catch (error) {
        console.log('[GROUPS]', error)
    }
}
}
