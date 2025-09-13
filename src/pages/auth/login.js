// src/pages/auth/login.js
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { loginUser } from "@/services";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext.js";
import Head from "next/head";
import styles from "../../styles/Auth.module.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [warning, setWarning] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setWarning("");
    setLoading(true);

    try {
      const result = await loginUser(data.email, data.password);

      if (result.success) {
        login(result.accessToken);
        router.push("/dashboard");
      } else {
        setWarning(
          result.message || "Authentication failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setWarning(
        error.message || "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Head>
        <title>Login | Portfolio</title>
      </Head>

      <Container fluid className={styles["login-container"]}>
        <div className={styles["authCard"]}>
          {warning && (
            <Alert variant="danger" className="mb-3">
              {warning}
            </Alert>
          )}

          <h3 className={styles["title"]}>Sign in or create an account</h3>
          <Form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className={styles["label"]}>
                {" "}
                Email Address
              </Form.Label>
              <Form.Control
                className={styles["input"]}
                type="email"
                {...register("email", { required: "Email is required" })}
                isInvalid={touchedFields.email && errors.email}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>

            {/* Password Input with Toggle */}
            <Form.Group
              className="mb-3"
              controlId="formPassword"
              style={{ position: "relative" }}
            >
              <Form.Label className={styles["label"]}> Password</Form.Label>
              <div className={styles["password-container"]}>
                <Form.Control
                  className={styles["input"]}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  isInvalid={touchedFields.password && errors.password}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={styles["password-toggle-icon"]}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>
              </div>
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}

              <div className="text-end mt-1">
                <Button variant="link" className={styles["forgot-password"]}>
                  Forgot password?
                </Button>
              </div>
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="success"
              className={styles["button"]}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Signing In...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </Form>

          <div className={styles["social-login-wrapper"]}>
            <div className={styles["or-signin-text"]}>
              <span>Or sign in with</span>
            </div>
          </div>

          <div className="text-center mt-1">
            <Button
              variant="link"
              className={styles["register-link"]}
              onClick={() => router.push("/auth/signup")}
            >
              Dont have an account Register
            </Button>
          </div>

          <div className="text-center mt-5">
            <p>
              <small>
                By signing in or creating an account, you agree to our{" "}
                <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </small>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
