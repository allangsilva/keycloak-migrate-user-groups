import appConfig from "./config/app.js";

import AuthKeycloak from "./services/AuthKeycloak.js";
import GetMembers from "./services/GetMembers.js";
import ListGroups from "./services/ListGroups.js";
import UpdateUserGroup from "./services/UpdateUserGroup.js";

const authToken = async (config) => {
  const authOrigin = new AuthKeycloak(config);
  const authResponse = await authOrigin.execute();

  if (!authResponse?.access_token) {
    throw new Error("Invalid auth token");
  }

  return authResponse.access_token;
};

(async () => {
  const authOriginToken = await authToken(appConfig.keycloak.origin);
  const groups = new ListGroups();
  const groupsResponse = await groups.execute(authOriginToken);

  const getMember = new GetMembers(authOriginToken);
  const membersGroup = new Map();

  for (const { name: groupName, id: groupId } of groupsResponse) {
    const members = await getMember.execute({ groupId });
    console.log(`Got ${members.length} members of group ${groupName}`);
    membersGroup.set(
      groupName,
      members.map(({ username }) => username)
    );
  }

  const authTargetToken = await authToken(appConfig.keycloak.target);
  const updateUserGroup = new UpdateUserGroup(authTargetToken);
  for (const group of membersGroup.entries()) {
    const [groupName, membersUsername] = group;
    for (const username of membersUsername) {
      console.log(`Updating ${username} to group ${groupName}`);
      await updateUserGroup.execute({ username, groupName });
    }
  }
})();
