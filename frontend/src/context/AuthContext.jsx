import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import apiClient from "../api/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("task_manager_token")
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(
      "task_manager_user"
    );

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Send login credentials to the backend.
  const login = async (credentials) => {
    const response = await apiClient.post(
      "/auth/login",
      credentials
    );

    const {
      token: receivedToken,
      user: receivedUser,
    } = response.data;

    localStorage.setItem(
      "task_manager_token",
      receivedToken
    );

    localStorage.setItem(
      "task_manager_user",
      JSON.stringify(receivedUser)
    );

    setToken(receivedToken);
    setUser(receivedUser);

    return response.data;
  };

  // Logout removes the stateless JWT from the browser.
  const logout = () => {
    localStorage.removeItem("task_manager_token");
    localStorage.removeItem("task_manager_user");

    setToken(null);
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      isAuthenticated: Boolean(token && user),
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};