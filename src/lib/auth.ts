const AUTH_KEY = 'wood_admin_auth';
const ADMIN_PASSWORD = 'wood2024'; // Você deve alterar esta senha

export const isAuthenticated = () => {
    return localStorage.getItem(AUTH_KEY) === 'true';
};

export const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true');
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem(AUTH_KEY);
};
