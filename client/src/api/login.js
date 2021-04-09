import { instance } from "./index";

// google login
function loginWithGoogle() {
  return instance.get("session");
}

// logout
function logout() {
  return instance.get("logout");
}

export { loginWithGoogle, logout };
