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
        <title>Metanym – Actionable Geopolitical Intelligence</title>
        <meta
          name="description"
          content="Actionable geopolitical intelligence at your fingertips. Transform complex global events into clear, structured insights with real-time monitoring and risk assessments."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
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
