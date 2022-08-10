import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {config, library, IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { UIContextProvider } from "../store/ui-context";
import { AuthContextProvider } from '../store/auth-context';
import type { AppProps } from "next/app";
import type {NextPage} from 'next';
import Layout from "../components/common/Layout/Layout";
import Auth from '../components/common/Auth/Auth';
import "../styles/globals.css";


config.autoAddCss = false;
library.add(faGoogle as IconDefinition);

type Page = {
  getLayout?: (children: React.ReactNode) => JSX.Element;
  isAuth?: boolean;
} & NextPage;

type App = {
  Component: Page;
} & AppProps;

const fallBackLayout = (children: React.ReactNode) => {
  return (<Layout>
    {children}
  </Layout>)
}


function MyApp({ Component, pageProps }: App) {

  const getLayout = Component.getLayout || fallBackLayout;
  

  return (
    <AuthContextProvider>
    <UIContextProvider>
      {Component.isAuth ? (<Auth>
        {getLayout(<Component {...pageProps}/>)}
      </Auth>) : getLayout(<Component {...pageProps}/>)}
    </UIContextProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
