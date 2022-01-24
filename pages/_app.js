import 'antd/dist/antd.css';
import Layout from 'components/layout/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import reducer, { initialState } from 'store/Reducer';
import { StateProvider } from 'store/StateProvider';
import 'styles/globals.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const defaultLayout = router.pathname !== '/login' ? true : false;

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <title>Hangout</title>
        <meta name='description' content='something' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      {defaultLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </StateProvider>
  );
}

export default MyApp;
