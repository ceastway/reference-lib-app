import '../styles.scss';
// import theme from '../theme';
import { AppProps } from 'next/app';
// import { Provider, createClient, dedupExchange, fetchExchange } from 'urql'
// import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
// import { LoginMutation, MeQuery, MeDocument, RegisterMutation, LogoutMutation } from '../generated/graphql';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="light-theme">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
