import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Team Bolt Statistics</title>
        <meta
          name="description"
          content="Come for the athlete statistics stay for the pizza"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Team Bolt ⚡️</h1>
      </main>
    </div>
  );
};

export default Home;
