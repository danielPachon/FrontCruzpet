export const AuthUser = () => {
  const userSession = localStorage.getItem("rolUser")
  let userInSession = userSession != null || "" || undefined ? true : false;
  return userInSession
}