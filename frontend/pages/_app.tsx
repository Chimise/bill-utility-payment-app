import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  config,
  library,
  IconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { SWRConfig } from "swr";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { UIContextProvider } from "../store/ui-context";
import { AuthContextProvider } from "../store/auth-context";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Layout from "../components/common/Layout/Layout";
import Auth from "../components/common/Auth/Auth";
import { fetcher } from "../utils";
import RequestError from "../utils/RequestError";
import useUI from "../hooks/useUI";
import useAuth from "../hooks/useAuth";
import ErrorBoundary from "../components/common/ErrorBoundary/ErrorBoundary";
import "../styles/globals.css";

config.autoAddCss = false;
library.add(faGoogle as IconDefinition, faSpinner as IconDefinition);

type Page = {
  getLayout?: (children: React.ReactNode) => JSX.Element;
  isAuth?: boolean;
} & NextPage;

type App = {
  Component: Page;
} & AppProps;

const fallBackLayout = (children: React.ReactNode) => {
  return <Layout>{children}</Layout>;
};

function MyApp({ Component, pageProps }: App) {
  const getLayout = Component.getLayout || fallBackLayout;
  const uiContext = useUI();
  const authContext = useAuth();

  return (
    <AuthContextProvider>
      <UIContextProvider>
        <SWRConfig
          value={{
            fetcher,
            onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
              if (
                err instanceof RequestError &&
                (err.code === 401 || err.code === 404)
              )
                return;
              if (retryCount >= 3) return;

              setTimeout(() => revalidate({ retryCount }), 5000);
            },
            onError: (err, key) => {
              if (err instanceof RequestError && err.code === 401) {
                uiContext.openToastHandler(
                  "warning",
                  "Login Session Expired, Logging out in 5 secs",
                  4000
                );
                setTimeout(() => {
                  authContext.logoutHandler();
                }, 5000);
              }
            },
          }}
        >
          <ErrorBoundary>
            {Component.isAuth ? (
              <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </ErrorBoundary>
        </SWRConfig>
      </UIContextProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
