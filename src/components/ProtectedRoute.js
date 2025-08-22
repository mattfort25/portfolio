// src/components/ProtectedRoute.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext.js";

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth();
  const { token, isCheckingAuth } = authState;
  const router = useRouter();

  useEffect(() => {
    if (isCheckingAuth) {
      return;
    }
    if (!token && router.pathname !== "/auth/login") {
      router.push("/auth/login");
    }
  }, [token, isCheckingAuth, router]);

  if (isCheckingAuth || !token) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
