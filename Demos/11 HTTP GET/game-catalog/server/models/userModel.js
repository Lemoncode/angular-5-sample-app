const user = {
  userName: 'jaisal',
  isAuthenticated: false
};

const getLogged = (userClient) => {
  user.isAuthenticated = userClient.userName === user.userName;
  return user.isAuthenticated;
};

const isUserAuthenticated = () => {
  return user.isAuthenticated;
};

const logout = () => {
  user.isAuthenticated = false;
  return user.isAuthenticated;
};

const updateUser = (userClient) => {
  user.userName = userClient.userName;
};

const getUser = () => {
  return user.userName;
};

module.exports = {
  getLogged,
  isUserAuthenticated,
  logout,
  updateUser,
  getUser
};
