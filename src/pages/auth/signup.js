import { useState } from "react";
import { useRouter } from "next/router";
import { signupUser } from "@/services";
import Head from "next/head";
import styles from "../../styles/Auth.module.css";
import PricingPlans from "@/components/PricingPlans";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("silver");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      setIsError(true);
      setLoading(false);
      return;
    }

    const userData = { name, email, password, subscriptionPlan };
    const result = await signupUser(userData);

    if (result.success) {
      setMessage(result.message);
      router.push("/dashboard");
    } else {
      setMessage(result.message);
      setIsError(true);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up | Portfolio </title>
      </Head>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Create Your Account</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            className={`${styles.message} ${
              isError ? styles.error : styles.success
            }`}
          >
            {message}
          </p>
        )}

        <PricingPlans
          selectedPlan={subscriptionPlan}
          onSelectPlan={setSubscriptionPlan}
        />
      </div>
    </div>
  );
}
