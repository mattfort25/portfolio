// src/pages/_app.js
import "@/styles/globals.css";
import Header from "../components/Header";
// import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/AuthContext.js";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";

const publicRoutes = ["/auth/login", "/auth/signup", "/"];
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      <Header />
      {isPublicRoute ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}
