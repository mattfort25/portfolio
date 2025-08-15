import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Metanym Financial</title>
        <meta
          name="description"
          content="Track your investments, get real-time news, and manage your portfolio with ease."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Entities Directory
      </main>

      <footer className={styles.footer}>
        <p>Financial Profile © 2025</p>
      </footer>
    </div>
  );
}
