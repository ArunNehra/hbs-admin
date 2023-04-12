import type { ReactElement, ReactNode } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { baselightTheme } from "../src/theme/DefaultColors";

// Redux Store
import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { selectAuthState } from "../store/authSlice";
import { Button } from "@mui/material";
import { RouteGuard } from "../src/components/RouteGuard";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
	Component: NextPageWithLayout;
}

const MyApp = (props: MyAppProps) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const theme = baselightTheme;
	const store: any = useStore();
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>HBS Admin</title>
			</Head>

			<PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					{getLayout(<Component {...pageProps} />)}
				</ThemeProvider>
			</PersistGate>
		</CacheProvider>
	);
};

export default wrapper.withRedux(MyApp);
