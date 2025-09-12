// src/pages/pricing.js
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Pricing.module.css";
import PricingPlans from "../components/PricingPlans";

export default function PricingPage() {
  const router = useRouter();

  const handleSelectPlan = (plan) => {
    console.log(`Selected plan: ${plan}`);
    router.push(`/auth/signup?plan=${plan}`);
  };

  return (
    <div className={styles.pricingContainer}>
      <Head>
        <title>Pricing | Metanym</title>
        <meta
          name="description"
          content="Choose the perfect plan for your investment journey"
        />
      </Head>
      <h1 className={styles.pageTitle}>Choose Your Plan</h1>
      <p className={styles.subtitle}>
        Find the perfect plan for your investment journey.
      </p>
      <PricingPlans onSelectPlan={handleSelectPlan} />
    </div>
  );
}
