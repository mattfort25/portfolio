// src/context/AuthContext.js
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  readToken,
  removeTokens,
  decodeToken,
  getAccessToken,
  my_fetch,
} from "@/services";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isCheckingAuth: true,
  });

  const initializeAuth = useCallback(async () => {
    const token = readToken();

    if (!token) {
      setAuthState({
        token: null,
        user: null,
        isCheckingAuth: false,
      });
      return;
    }

    const decoded = decodeToken(token);
    if (decoded && decoded.id && decoded.email) {
      setAuthState({
        token,
        user: { id: decoded.id, email: decoded.email },
        isCheckingAuth: false,
      });
    } else {
      console.error(
        "Invalid or malformed token found during initialization. Clearing tokens."
      );
      removeTokens();
      setAuthState({
        token: null,
        user: null,
        isCheckingAuth: false,
      });
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = (accessToken) => {
    const decoded = decodeToken(accessToken);
    if (decoded && decoded.id && decoded.email) {
      setAuthState({
        token: accessToken,
        user: { id: decoded.id, email: decoded.email },
        isCheckingAuth: false,
      });
    } else {
      console.error(
        "Failed to decode token or token missing essential info in login context. Clearing tokens."
      );
      removeTokens();
      setAuthState({
        token: null,
        user: null,
        isCheckingAuth: false,
      });
    }
  };

  const logout = () => {
    removeTokens();
    setAuthState({
      token: null,
      user: null,
      isCheckingAuth: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
