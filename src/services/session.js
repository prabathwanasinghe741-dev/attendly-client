const sessionKey = 'com.prabathwanasinghe.auth.v1.user_profile';
export const saveToken = (token) => { localStorage.setItem(sessionKey, token); };
export const readToken = () => { return localStorage.getItem(sessionKey); };
export const eraseToken = () => { localStorage.removeItem(sessionKey); };