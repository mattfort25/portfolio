// pages/index.js
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Financial Profile – Enterprise Risk Management</title>
        <meta
          name="description"
          content="Track your investments, get real-time news, and manage your portfolio with intelligent risk management."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </Head>

      <main>
        <Hero />
        <Benefits />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
