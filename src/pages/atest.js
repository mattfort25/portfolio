import Head from "next/head";
import styles from "../styles/Home.module.css";
import TestAPI from "../components/TestAPI";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Metanym API Test</title>
        <meta
          name="description"
          content="Track your investments, get real-time news, and manage your portfolio with ease."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TestAPI />
      </main>

      <footer className={styles.footer}>
        <p>Metanym Financial © 2025</p>
      </footer>
    </div>
  );
}
