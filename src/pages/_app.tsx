import "@/styles/globals.css";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/helpers/create-emotion-cashe";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../helpers/theme";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Loader from "@/components/loader/loader"; // ✅ Loader komponentini qo‘shdik

// Emotion uchun client-side cache yaratish
const clientSideEmotionCache = createEmotionCache();
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // ✅ Loader uchun state

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // 1.5 sekunddan keyin loaderni yo‘q qilamiz
    }, 1500);

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? <Loader /> : <Component {...pageProps} />}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
